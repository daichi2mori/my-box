import { Link } from "@remix-run/react";

const Book = ({ path }: { path: string }) => {
	const encodedPath = encodeURIComponent(path);
	const baseUrl = 'https://my-box-image.daichi2mori.com';

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
