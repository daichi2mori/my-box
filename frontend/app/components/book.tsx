import { Link } from "@remix-run/react";

const Book = ({ path, baseUrl, type }: { path: string, baseUrl: string, type: 'ero' | 'manga' }) => {
	const encodedPath = encodeURIComponent(path);

	return (
		<Link to={`/${type}/detail/${encodedPath}`} prefetch="render">
			<img
				src={`${baseUrl}/${type}/cover/${encodedPath}`}
				alt="i"
				className="w-full h-full object-contain"
			/>
		</Link>
	);
};

export default Book;
