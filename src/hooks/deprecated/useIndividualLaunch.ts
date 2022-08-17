import { useEffect, useState } from "react";

export default function useIndividualLaunch(id: string) {
	const [launchDetails, setLaunchDetails] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		const url = "https://api.spacex.land/graphql/";
		const query = {
			query: `{
                launch(id: ${id}) {
                    id
                    details
                    mission_name
                    links {
                        flickr_images
                        mission_patch_small
                    }
                    launch_date_local
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
				setLaunchDetails(res.data);
				setLoading(false);
			})
			.catch((err) => console.error(err));

		return () => controller.abort();
	}, [id]);

	return { loading, launchDetails };
}
