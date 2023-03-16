import React, { createContext, useContext, useEffect, useState } from "react";

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

type LaunchContext = {
	loading: boolean;
	next: () => void;
	prev: () => void;
	goToPage: (pageNum: number) => void;
	launches: Launch[];
	page: number;
	numberOfPages: number;
	selectedLaunchId: number | undefined;
	setSelectedLaunchId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const LaunchesContext = createContext<LaunchContext | undefined>(undefined);

export default function useLaunches() {
	const context = useContext(LaunchesContext);
	if (context === undefined) {
		throw new Error("useContext must be called within context provider");
	} else {
		return context;
	}
}

let launchesCache: Launch[] | undefined;
let numberOfPagesCache: number | undefined;

type ContextPropTypes = {
	children: JSX.Element | JSX.Element[];
};

export function LaunchesContextProvider({ children }: ContextPropTypes) {
	const [page, setPage] = useState<number>(1);
	const [launches, setLaunches] = useState<Launch[]>(launchesCache || []);
	const [loading, setLoading] = useState<boolean>(true);
	const [numberOfPages, setNumberOfPages] = useState<number>(numberOfPagesCache || 0);
	const [selectedLaunchId, setSelectedLaunchId] = useState<number>();
	const itemsPerPage = 9;

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
    setLoading(true)
		if (launchesCache) {
			setLoading(false);
		} else {
			const controller = new AbortController();
			const url = import.meta.env.VITE_API_ENDPOINT;
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
				headers: { "Content-Type": "application/json", 'mode': 'no-cors' },
				body: JSON.stringify(query),
				signal: controller.signal,
			};
			fetch(url, options)
				.then((res) => res.json())
				.then((res) => {
          console.log(res)
					const newData = res.data.launchesPastResult.data;
					const newNumberOfPages = Math.ceil(res.data.launchesPastResult.result.totalCount / itemsPerPage);
					launchesCache = newData;
					numberOfPagesCache = newNumberOfPages;
					setLaunches(newData);
					setNumberOfPages(newNumberOfPages);
					setLoading(false);
				})
				.catch((err) => {
          setLoading(false)
          console.error(err)});
			return () => controller.abort();
		}
	}, [page]);

	const contextValue = {
		loading,
		next,
		prev,
		goToPage,
		launches,
		page,
		numberOfPages,
		selectedLaunchId,
		setSelectedLaunchId,
	};

	return <LaunchesContext.Provider value={contextValue}>{children}</LaunchesContext.Provider>;
}
