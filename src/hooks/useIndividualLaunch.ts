import { useEffect, useState } from 'react';
import { ResLaunch } from '../context/ContextTypes';

type Ship = {
  name: string;
  mass_kg: number;
  year_built: number;
  active: boolean;
};

type Rocket = {
  mass: {
    kg: number;
  };
  name: string;
  height: {
    meters: number;
  };
  description: string;
  wikipedia: string;
  active: boolean;
};

export type LaunchDetails = Omit<ResLaunch, 'rocket' | 'ships'> & {
  rocket: Rocket;
  ships: Ship[];
};

export default function useIndividualLaunch(id: string) {
  const [additionalDetails, setAdditionalDetails] = useState<LaunchDetails>();
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const url = import.meta.env.VITE_API_ENDPOINT;
    const query = {
      query: { _id: id },
      options: { populate: ['rocket', 'ships'] },
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
      signal: controller.signal,
    };
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        const docs = res.docs as LaunchDetails[];
        if (docs.length) {
          setAdditionalDetails(docs[0]);
          setLoadingDetails(false);
        }
      })
      .catch(err => console.error(err));

    return () => controller.abort();
  }, [id]);

  return { loadingDetails, additionalDetails };
}
