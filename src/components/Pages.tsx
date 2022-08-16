import styled from "styled-components";
import Col from "react-bootstrap/Col";

type PagesProps = {
	numberOfPages: number;
	currentPage: number;
	goToPage: (pageNum: number) => void;
	pagesToDisplay?: number;
};

const PagesGrid = styled.div`
	margin: 1rem auto;
	display: grid;
	grid-template-columns: 1fr 2rem 1fr;
	grid-template-rows: auto auto;
	grid-template-areas: "pages pages pages" "prev . next";
	align-items: center;
	gap: 0.5em;
	font-size: 1.5rem;

	@media screen and (min-width: 576px) {
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: auto;
		grid-template-areas: "prev pages next";
	}
`;

const PageNumbersWrapper = styled(Col)`
	grid-area: pages;
	display: grid;
	grid-template-columns: 1fr 2rem 1fr;
	align-items: center;

	span {
		padding: 0.5rem;
		cursor: pointer;
		text-decoration: underline;
		&:hover {
			color: #999;
		}
	}

	.current-page {
		font-size: 1.3em;
		text-decoration: none;
		text-align: center;
		border-radius: 0.1em;
	}

	div:first-child {
		text-align: right;
	}
`;

const PrevCol = styled(Col)`
	grid-area: prev;
	text-align: right;
	cursor: pointer;
`;

const NextCol = styled(Col)`
	grid-area: next;
	cursor: pointer;
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

	function handlePrev() {
		if (currentPage > 1) goToPage(currentPage - 1);
	}

	function handleNext() {
		if (currentPage < numberOfPages) goToPage(currentPage + 1);
	}

	return (
		<PagesGrid>
			<PrevCol onClick={handlePrev}>Back</PrevCol>
			<PageNumbersWrapper>
				<div>
					{left.map((pageNum) => (
						<span onClick={() => goToPage(pageNum)} key={pageNum}>
							{pageNum}
						</span>
					))}
				</div>
				<div className='current-page bg-primary text-white'>{currentPage}</div>
				<div>
					{right.map((pageNum) => (
						<span onClick={() => goToPage(pageNum)} key={pageNum}>
							{pageNum}
						</span>
					))}
				</div>
			</PageNumbersWrapper>
			<NextCol onClick={handleNext}>Next</NextCol>
		</PagesGrid>
	);
}
