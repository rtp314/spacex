import styles from "./Pages.module.css";

type PagesProps = {
	numberOfPages: number;
	currentPage: number;
	goToPage: (pageNum: number) => void;
	pagesToDisplay?: number;
};

export default function Pages({ numberOfPages, currentPage, goToPage, pagesToDisplay = 9 }: PagesProps) {
	const pages = generatePages();

	function generatePages() {
		// offset is how many pages to display left and right of current page
		const offset = Math.floor(pagesToDisplay / 2);
		const lowerBound = currentPage - offset > 0 ? currentPage - offset : 1;
		const upperBound = currentPage + offset <= numberOfPages ? currentPage + offset : numberOfPages;
		const pages: number[] = [];
		for (let i = lowerBound; i <= upperBound; i++) {
			pages.push(i);
		}

		return pages;
	}
	return (
		<>
			{pages.map((pageNum) => (
				<span className={styles.pagenumber} onClick={() => goToPage(pageNum)} key={pageNum}>
					{pageNum}
				</span>
			))}
		</>
	);
}
