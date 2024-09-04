import { Link } from "@remix-run/react";

const Book = ({ path }: { path: string }) => {
	const encodedPath = encodeURIComponent(path);

	return (
		<Link to={`/ero/detail/${encodedPath}`} prefetch="render">
			<img
				src={`http://localhost:3005/cover/${encodedPath}`}
				alt="i"
				className="w-full h-full object-contain"
			/>
		</Link>
	);
};

export default Book;
