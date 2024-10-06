import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [{ title: "my-box" }, { name: "description", content: "Welcome" }];
};

export default function Index() {
	return (
		<main className="h-[100dvh] flex flex-col items-center justify-center gap-4">
			<Link
				to="/ero/page/1"
				prefetch="viewport"
				className="py-3 px-6 bg-neutral-100 text-background text-lg font-medium rounded-md"
			>
				Ero
			</Link>
			<Link to="/manga/page/1" prefetch="viewport" className="py-3 px-6 bg-neutral-100 text-background text-lg font-medium rounded-md">
				Manga
			</Link>
		</main>
	);
}
