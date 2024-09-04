import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCovers, getTotalPage } from "~/.server/server";
import Book from "~/components/book";
import Pagination from "~/components/pagination";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.page, "Missing page params");

	const currentPage = params.page;
	const totalPage = (await getTotalPage()) || "";
	const covers = await getCovers(params.page);

	return json({ covers, currentPage, totalPage }, { headers: {"Cache-Control": "public, max-age=3600"}});
};

const Page = () => {
	const { covers, currentPage, totalPage } = useLoaderData<typeof loader>();

	return (
		<main>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-3 p-2 max-w-screen-lg mx-auto">
				{covers?.map((cover) => (
					<div key={cover} className="bg-neutral-700 aspect-[794/1121]">
						<Book path={cover} />
					</div>
				))}
			</div>
			<Pagination
				currentPage={Number(currentPage)}
				totalPage={Number(totalPage)}
			/>
		</main>
	);
};

export default Page;
