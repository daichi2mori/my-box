import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getBook } from "~/.server/server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.path, "Missing path params");

	const books = await getBook(params.path);

	return json({ books });
};
const Page = () => {
	const { books } = useLoaderData<typeof loader>();
	const baseUrl = "https://my-box-image.daichi2mori.com";

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
