import Book from "@/app/components/book";
import Pagination from "@/app/components/pagination";
import { getCovers } from "@/app/server/server";

const Page = async ({ params }: { params: { page: string } }) => {
	const covers = await getCovers(params.page);

	return (
		<main>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-3 p-2 max-w-screen-lg mx-auto">
				{covers?.map((cover) => (
					<div key={cover} className="bg-neutral-700 aspect-[794/1121]">
						<Book path={cover} />
					</div>
				))}
			</div>
			<Pagination currentPage={params.page} />
		</main>
	);
};

export default Page;
