import Image from "next/image";
import Link from "next/link";

const Book = ({ path }: { path: string }) => {
	return (
		<Link href={`/ero/detail/${path}`}>
			<Image
				src={`http://localhost:3005/cover/${path}`}
				width={500}
				height={500}
				alt="i"
				className="w-full h-full object-contain"
			/>
		</Link>
	);
};

export default Book;