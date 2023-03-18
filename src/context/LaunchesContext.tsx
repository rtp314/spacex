import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiResponse, ResLaunch } from './ContextTypes';

export type Launch = {
  id: string;
  details: string;
  name: string;
  date_local: string;
  links: {
    patch?: {
      small: string;
      large: string;
    };
    flickr?: {
      small: string[];
      original: string[];
    };
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
  selectedLaunchId: string | undefined;
  setSelectedLaunchId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const LaunchesContext = createContext<LaunchContext | undefined>(undefined);

export default function useLaunches() {
  const context = useContext(LaunchesContext);
  if (context === undefined) {
    throw new Error('useContext must be called within context provider');
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
  const [selectedLaunchId, setSelectedLaunchId] = useState<string>();
  const itemsPerPage = 9;

  function invalidateCache() {
    launchesCache = undefined;
    numberOfPagesCache = undefined;
  }

  function next() {
    setLoading(true);
    invalidateCache();
    setPage(page => page + 1);
  }

  function prev() {
    if (page === 1) return;
    setLoading(true);
    invalidateCache();
    setPage(page => page - 1);
  }

  function goToPage(pageNum: number) {
    setLoading(true);
    invalidateCache();
    setPage(pageNum);
  }

  useEffect(() => {
    setLoading(true);
    if (launchesCache) {
      setLoading(false);
    } else {
      const controller = new AbortController();
      const url = import.meta.env.VITE_API_ENDPOINT;
      const query = {
        query: {},
        options: { limit: itemsPerPage, offset: (page - 1) * itemsPerPage },
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
        signal: controller.signal,
      };
      fetch(url, options)
        .then(res => res.json())
        .then((res: ApiResponse) => {
          const { docs } = res;
          const newNumberOfPages = Math.ceil(res.totalDocs / itemsPerPage);
          launchesCache = docs.map(doc => {
            const { id, date_local, details, name, links } = doc;
            return { id, date_local, details, name, links: links || {} };
          });
          numberOfPagesCache = newNumberOfPages;
          setLaunches(launchesCache);
          setNumberOfPages(newNumberOfPages);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.error(err);
        });
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
