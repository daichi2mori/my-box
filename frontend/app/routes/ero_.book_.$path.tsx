import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getBook } from "~/.server/server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.path, "Missing path params");
	
	const books = await getBook(params.path);
	
	return json({ books }, { headers: {"Cache-Control": "public, max-age=3600"}});
};
const Page = () => {
	const { books } = useLoaderData<typeof loader>();
	const baseUrl = 'http://192.168.11.9:3005';

	return (
		<main className="flex items-center gap-2 h-[100svh] snap-x snap-mandatory overflow-x-scroll">
			{books?.map((book) => (
				<div
					key={book}
					className="flex-shrink-0 snap-center w-screen grid place-items-center"
				>
					<img
						src={`${baseUrl}/image/${book}`}
						alt="i"
						className="w-screen max-w-2xl max-h-[99svh] object-contain"
					/>
				</div>
			))}
		</main>
	);
};

export default Page;
