import { getBook } from "@/app/server/server";
import Image from "next/image";

const Page = async ({ params }: { params: { path: string } }) => {
	const books = await getBook(params.path);

	return (
		<main className="flex items-center gap-2 h-[100svh] snap-x snap-mandatory overflow-x-scroll">
			{books?.map((book) => (
				<div
					key={book}
					className="flex-shrink-0 snap-center w-screen grid place-items-center"
				>
					<Image
						src={`http://localhost:3005/image/${book}`}
						width={500}
						height={600}
						alt="i"
						className="w-screen max-w-2xl max-h-[99svh] object-contain"
					/>
				</div>
			))}
		</main>
	);
};

export default Page;
