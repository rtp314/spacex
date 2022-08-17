import { useEffect, useState } from "react";
import { Launch } from "../../context/LaunchesContext";

let launchesCache: Launch[] | undefined;
let numberOfPagesCache: number | undefined;

export default function useLaunches(itemsPerPage: number = 9) {
	const [page, setPage] = useState<number>(1);
	const [launches, setLaunches] = useState<Launch[]>(launchesCache || []);
	const [loading, setLoading] = useState<boolean>(true);
	const [numberOfPages, setNumberOfPages] = useState<number>(numberOfPagesCache || 0);
	const [selectedLaunchId, setSelectedLaunchId] = useState<number>();

	function invalidateCache() {
		launchesCache = undefined;
		numberOfPagesCache = undefined;
	}

	function next() {
		setLoading(true);
		invalidateCache();
		setPage((page) => page + 1);
	}

	function prev() {
		if (page === 1) return;
		setLoading(true);
		invalidateCache();
		setPage((page) => page - 1);
	}

	function goToPage(pageNum: number) {
		setLoading(true);
		invalidateCache();
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
					const newData = res.data.launchesPastResult.data;
					const newNumberOfPages = Math.ceil(res.data.launchesPastResult.result.totalCount / itemsPerPage);
					launchesCache = newData;
					numberOfPagesCache = newNumberOfPages;
					setLaunches(newData);
					setNumberOfPages(newNumberOfPages);
					setLoading(false);
				})
				.catch((err) => console.error(err));
			return () => controller.abort();
		}
	}, [page]);

	return { loading, next, prev, goToPage, launches, page, numberOfPages, selectedLaunchId, setSelectedLaunchId };
}
