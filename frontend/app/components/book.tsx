import Image from "next/image";
import Link from "next/link";

const Book = ({ path }: { path: string }) => {
	const encodedPath = encodeURIComponent(path);

	return (
		<Link href={`/ero/detail/${path}`}>
			<Image
				src={`http://localhost:3005/cover/${encodedPath}`}
				width={300}
				height={300}
				priority
				loading="eager"
				alt="i"
				className="w-full h-full object-contain"
			/>
		</Link>
	);
};

export default Book;
