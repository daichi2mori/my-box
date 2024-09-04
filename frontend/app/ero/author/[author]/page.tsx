import Book from "@/app/components/book";
import { getAuthor } from "@/app/server/server";

const Page = async ({ params }: { params: { author: string } }) => {
	const covers = await getAuthor(params.author);

	return (
		<main className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-3 p-2 max-w-screen-lg mx-auto">
			{covers?.map((cover) => (
				<div key={cover} className="bg-neutral-700 aspect-[794/1121]">
					<Book path={cover} />
				</div>
			))}
		</main>
	);
};

export default Page;
