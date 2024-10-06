const Pagination = ({
	currentPage,
	totalPage,
	type
}: { currentPage: number; totalPage: number, type: 'ero' | 'manga' }) => {
	const maxPage = 5;
	const startPage = Math.max(1, currentPage - Math.floor(maxPage / 2));
	const endPage = Math.min(totalPage, startPage + maxPage - 1);

	const pages = [];
	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	return (
		<div className="w-full flex justify-center items-center gap-4 mt-10 pb-10">
			{pages.map((page) => (
				<a
					key={page}
					href={`/${type}/page/${page}`}
					className={`w-11 leading-[2.75rem] text-neutral-100 text-lg text-center rounded-full ${
						page === currentPage
							? "bg-neutral-800 font-semibold"
							: "hover:bg-neutral-800"
					}`}
				>
					{page}
				</a>
			))}
		</div>
	);
};

export default Pagination;
