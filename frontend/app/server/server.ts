export const getCovers = async (page: string) => {
	try {
		const res = await fetch(`http://localhost:3005/page/${page}`, {
			next: { revalidate: 60 * 60 * 2 },
		});
		const covers: string[] = await res.json();
		return covers;
	} catch (e) {
		console.log(e);
	}
};

export const getAuthor = async (author: string) => {
	try {
		const res = await fetch(`http://localhost:3005/author/${author}`, {
			next: { revalidate: 60 * 60 * 2 },
		});
		const authors: string[] = await res.json();
		return authors;
	} catch (e) {
		console.log(e);
	}
};

export const getBook = async (path: string) => {
	try {
		const res = await fetch(`http://localhost:3005/book/${path}`, {
			next: { revalidate: 60 * 60 * 2 },
		});
		const books: string[] = await res.json();
		return books;
	} catch (e) {
		console.log(e);
	}
};

export const getTotalPage = async () => {
	try {
		const res = await fetch("http://localhost:3005/total-page", {
			next: { revalidate: 60 * 60 * 2 },
		});
		const totalPage = await res.text();
		return totalPage;
	} catch (e) {
		console.log(e);
	}
};
