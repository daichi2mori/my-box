import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCovers, getTotalPage } from "~/.server/server";
import { getBaseUrl } from "~/components/baseUrl";
import Book from "~/components/book";
import Pagination from "~/components/pagination";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	invariant(params.page, "Missing page params");

	const currentPage = params.page;
	const totalPage = (await getTotalPage('ero')) || "";
	const covers = await getCovers(params.page, 'ero');
	const baseUrl = getBaseUrl(request)

	return json({ covers, currentPage, totalPage, baseUrl });
};

const Page = () => {
	const { covers, currentPage, totalPage, baseUrl } = useLoaderData<typeof loader>();

	return (
		<main>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-3 p-2 max-w-screen-lg mx-auto">
				{covers?.map((cover) => (
					<div key={cover} className="bg-neutral-700 aspect-[794/1121]">
						<Book path={cover} baseUrl={baseUrl} type="ero" dest='detail' />
					</div>
				))}
			</div>
			<Pagination
				currentPage={Number(currentPage)}
				totalPage={Number(totalPage)}
				type='ero'
			/>
		</main>
	);
};

export default Page;
