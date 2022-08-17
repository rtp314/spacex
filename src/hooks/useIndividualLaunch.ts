import { useEffect, useState } from "react";

type Ship = {
	name: string;
	weight_kg: number;
	year_built: number;
	active: boolean;
};

export type LaunchDetailsType = {
	details: string;
	mission_name: string;
	launch_date_local: string;
	links: {
		flickr_images: string[];
		mission_patch_small: string;
	};
	rocket: {
		rocket: {
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
	};
	ships: Ship[];
};

export default function useIndividualLaunch(id: number) {
	const [additionalDetails, setAdditionalDetails] = useState<LaunchDetailsType>();
	const [loadingDetails, setLoadingDetails] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		const url = "https://api.spacex.land/graphql/";
		const query = {
			query: `{
                launch(id: ${id}) {
                    details
                    mission_name
                    launch_date_local
                    links {
                        flickr_images
                        mission_patch_small
                    }
                    rocket {
                        rocket {
                            mass {
                                kg
                            }
                            name
                            height {
                                meters
                            }
                            description
                            wikipedia
                            active
                        }
                    }
                    ships {
                        name
                        weight_kg
                        year_built
                        active
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
				setAdditionalDetails(res.data.launch);
				setLoadingDetails(false);
			})
			.catch((err) => console.error(err));

		return () => controller.abort();
	}, [id]);

	return { loadingDetails, additionalDetails };
}
