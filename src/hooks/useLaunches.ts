import { useEffect, useState } from "react";

export type Launch = {
	id: number;
	mission_name: string;
	launch_date_local: string;
	links: {
		flickr_images: string[];
		mission_patch_small: string;
	};
};

export default function useLaunches(itemsPerPage: number = 9) {
	const [page, setPage] = useState<number>(1);
	const [launches, setLaunches] = useState<Launch[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const [numberOfPages, setNumberOfPages] = useState<number>(0);

	function next() {
		setLoading(true);
		setPage((page) => page + 1);
	}

	function prev() {
		if (page === 1) return;
		setLoading(true);
		setPage((page) => page - 1);
	}

	function goToPage(pageNum: number) {
		setLoading(true);
		setPage(pageNum);
	}

	useEffect(() => {
		const controller = new AbortController();
		const url = "https://api.spacex.land/graphql/";
		const query = {
			query: `{
                launchesPastResult(limit: ${itemsPerPage}, offset: ${(page - 1) * itemsPerPage}) {
                    data {
                        id
                        mission_name
                        links {
                            flickr_images
                            mission_patch_small
                        }
                        launch_date_local
                    }
                    result {
                        totalCount
                    }
                }
            }`,
		};
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(query),
			signal: controller.signal,
		};
		fetch(url, options)
			.then((res) => res.json())
			.then((res) => {
				setLaunches(res.data.launchesPastResult.data);
				setNumberOfPages(Math.ceil(res.data.launchesPastResult.result.totalCount / 9));
				setLoading(false);
			})
			.catch((err) => console.error(err));

		return () => controller.abort();
	}, [page]);

	return { loading, next, prev, goToPage, launches, page, numberOfPages };
}
