import { getTotalPage } from "../server/server";

const Pagination = async ({ currentPage }: { currentPage: string }) => {
	const maxPage = 5;
	const totalPage = await getTotalPage();
	const startPage = Math.max(1, Number(currentPage) - Math.floor(maxPage / 2));
	const endPage = Math.min(Number(totalPage), startPage + maxPage - 1);

	const pages = [];
	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	return (
		<div className="w-full flex justify-center items-center gap-4 mt-10 pb-10">
			{pages.map((page) => (
				<a
					key={page}
					href={`/ero/${page}`}
					className={`w-11 leading-[2.75rem] text-neutral-100 text-lg text-center rounded-full ${
						page === Number(currentPage)
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
