import styled from "styled-components";

type PagesProps = {
	numberOfPages: number;
	currentPage: number;
	goToPage: (pageNum: number) => void;
	pagesToDisplay?: number;
};

const PagesWrapper = styled.div`
	grid-area: pages;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 2rem 1fr;
	align-items: center;
`;

const PageSpan = styled.span`
	margin: 0.5rem;
	cursor: pointer;
	text-decoration: underline;
`;

const CurrentPage = styled(PageSpan)`
	font-size: 1.3em;
	text-decoration: none;
`;

export default function Pages({ numberOfPages, currentPage, goToPage, pagesToDisplay = 9 }: PagesProps) {
	const { left, right } = generatePages();

	function generatePages() {
		// offset is how many pages to display left and right of current page
		const offset = Math.floor(pagesToDisplay / 2);
		const lowerBound = currentPage - offset > 0 ? currentPage - offset : 1;
		const upperBound = currentPage + offset <= numberOfPages ? currentPage + offset : numberOfPages;
		const left: number[] = [];
		const right: number[] = [];
		for (let i = lowerBound; i <= upperBound; i++) {
			if (i < currentPage) left.push(i);
			if (i > currentPage) right.push(i);
		}

		return { left, right };
	}
	return (
		<PagesWrapper>
			<div style={{ textAlign: "right" }}>
				{left.map((pageNum) => (
					<PageSpan onClick={() => goToPage(pageNum)} key={pageNum}>
						{pageNum}
					</PageSpan>
				))}
			</div>
			<div>
				<CurrentPage>{currentPage}</CurrentPage>
			</div>
			<div>
				{right.map((pageNum) => (
					<PageSpan onClick={() => goToPage(pageNum)} key={pageNum}>
						{pageNum}
					</PageSpan>
				))}
			</div>
		</PagesWrapper>
	);
}
