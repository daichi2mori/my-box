import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getBaseUrl } from "~/components/baseUrl";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	invariant(params.path, "Missing path params");

	const decodedPath = decodeURIComponent(params.path);
	const author = decodedPath.split("__")[0];
	const title = decodedPath.split("__")[1];
	const baseUrl = getBaseUrl(request);

	return json({ decodedPath, author, title, baseUrl });
};

const Page = () => {
	const { decodedPath, author, title, baseUrl } = useLoaderData<typeof loader>();

	return (
		<main className="w-full h-[100svh] flex flex-col items-center justify-center p-5">
			<img
				src={`${baseUrl}/manga/cover/${decodedPath}`}
				alt="i"
				className="rounded-lg max-h-96 md:max-h-[35rem] object-contain"
			/>
			<div className="flex flex-col items-center justify-between gap-5 lg:gap-8 px-5 pb-10">
				<p className="flex justify-center text-neutral-100 font-semibold mt-2">
					{title}
				</p>
				<Link
					to={`/manga/author/${author}`}
					className="py-2 px-4 bg-neutral-100 text-background font-medium rounded-md"
				>
					{author}
				</Link>
				<Link
					to={`/manga/book/${decodedPath}`}
					className="py-2 px-4 bg-neutral-100 text-background font-medium rounded-md"
				>
					続き
				</Link>
			</div>
		</main>
	);
};

export default Page;
