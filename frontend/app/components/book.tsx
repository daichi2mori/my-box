import { Link } from "@remix-run/react";

const Book = ({ path }: { path: string }) => {
	const encodedPath = encodeURIComponent(path);
	const baseUrl = 'http://192.168.11.9:3005';

	return (
		<Link to={`/ero/detail/${encodedPath}`} prefetch="render">
			<img
				src={`${baseUrl}/cover/${encodedPath}`}
				alt="i"
				className="w-full h-full object-contain"
			/>
		</Link>
	);
};

export default Book;
