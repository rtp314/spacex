import { useEffect, useState } from "react";

export type Launch = {
	id: number;
	details: string;
	mission_name: string;
	launch_date_local: string;
	links: {
		flickr_images: string[];
		mission_patch_small: string;
	};
};

let launchesCache: Launch[];
let numberOfPagesCache: number;

export default function useLaunches(itemsPerPage: number = 9) {
	const [page, setPage] = useState<number>(1);
	const [launches, setLaunches] = useState<Launch[]>(launchesCache);
	const [loading, setLoading] = useState<boolean>(true);
	const [numberOfPages, setNumberOfPages] = useState<number>(numberOfPagesCache || 0);

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
		if (launchesCache) {
			setLoading(false);
		} else {
			const controller = new AbortController();
			const url = "https://api.spacex.land/graphql/";
			const query = {
				query: `{
                launchesPastResult(limit: ${itemsPerPage}, offset: ${(page - 1) * itemsPerPage}) {
                    data {
                        id
                        details
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
					launchesCache = res.data.launchesPastResult.data;
					numberOfPagesCache = Math.ceil(res.data.launchesPastResult.result.totalCount / itemsPerPage);
					setLaunches(launchesCache);
					setNumberOfPages(numberOfPagesCache);
					setLoading(false);
				})
				.catch((err) => console.error(err));
			return () => controller.abort();
		}
	}, [page]);

	return { loading, next, prev, goToPage, launches, page, numberOfPages };
}
