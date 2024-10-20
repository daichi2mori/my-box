import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { } from "~/.server/server";
import { getBaseUrl } from "~/components/baseUrl";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	// invariant(params.page, "Missing page params");

	// const currentPage = params.page;
	// const totalPage = (await getTotalPage('ero')) || "";
	// const covers = await getCovers(params.page, 'ero');
	const baseUrl = getBaseUrl(request)

	// return json({ covers, currentPage, totalPage, baseUrl });
    return json({baseUrl})

};

const Page = () => {
	// const { covers, currentPage, totalPage, baseUrl } = useLoaderData<typeof loader>();
    const { baseUrl } = useLoaderData<typeof loader>();

	return (
		<main>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-3 p-2 max-w-screen-lg mx-auto">
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
                <video src={`${baseUrl}/video/anime__Euphoria__Euphoria1.mkv`} width="800px" height="450px" crossOrigin="use-credentials" playsInline controls preload="metadata" />
			</div>
		</main>
	);
};

export default Page;
