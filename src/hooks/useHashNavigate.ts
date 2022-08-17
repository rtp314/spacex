import { useEffect, useState } from "react";

export default function useHashNavigate() {
	const [hash, setHash] = useState<string>(window.location.hash);
	useEffect(() => {
		function navigate(e: Event) {
			setHash(window.location.hash);
		}
		window.addEventListener("hashchange", navigate);

		return () => window.removeEventListener("hashchange", navigate);
	}, []);
	return hash;
}
