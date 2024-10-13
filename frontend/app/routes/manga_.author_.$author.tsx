import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getAuthor } from "~/.server/server";
import { getBaseUrl } from "~/components/baseUrl";
import Book from "~/components/book";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	invariant(params.author, "Missing author params");

	const covers = await getAuthor(params.author, 'manga');
	const baseUrl = getBaseUrl(request);

	return json({ covers, baseUrl });
};

const Page = () => {
	const { covers, baseUrl } = useLoaderData<typeof loader>();

	return (
		<main className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-3 p-2 max-w-screen-lg mx-auto">
			{covers?.map((cover) => (
				<div key={cover} className="bg-neutral-700 aspect-[794/1121]">
					<Book path={cover} baseUrl={baseUrl} type="manga" dest='book' />
				</div>
			))}
		</main>
	);
};

export default Page;
