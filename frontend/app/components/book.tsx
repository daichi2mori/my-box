import { Link } from "@remix-run/react";

type BookProps = {
	path: string;
	baseUrl: string;
	type: 'ero' | 'manga';
	dest: 'detail' | 'author' | 'book';
}

const Book = ({path, baseUrl, type, dest}: BookProps) => {
	let destPath = encodeURIComponent(path);
	if (dest === 'author') {
		destPath = destPath.split("__")[0];
	}
	const encodedPath = encodeURIComponent(path);

	return (
		<Link to={`/${type}/${dest}/${destPath}`} prefetch="render">
			<img
				src={`${baseUrl}/${type}/cover/${encodedPath}`}
				alt="i"
				className="w-full h-full object-contain"
			/>
		</Link>
	);
};

export default Book;
