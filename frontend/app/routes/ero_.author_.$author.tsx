import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getAuthor } from "~/.server/server";
import Book from "~/components/book";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.author, "Missing author params");

	const covers = await getAuthor(params.author);

	return json({ covers });
};

const Page = () => {
	const { covers } = useLoaderData<typeof loader>();

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
