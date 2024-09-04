export const getCovers = async (page: string) => {
	try {
		const res = await fetch(`http://localhost:3005/page/${page}`);
		const covers: string[] = await res.json();
		return covers;
	} catch (e) {
		console.log(e);
	}
};

export const getAuthor = async (author: string) => {
	try {
		const res = await fetch(`http://localhost:3005/author/${author}`);
		const authors: string[] = await res.json();
		return authors;
	} catch (e) {
		console.log(e);
	}
};

export const getBook = async (path: string) => {
	try {
		const res = await fetch(`http://localhost:3005/book/${path}`);
		const books: string[] = await res.json();
		return books;
	} catch (e) {
		console.log(e);
	}
};

export const getTotalPage = async () => {
	try {
		const res = await fetch("http://localhost:3005/total-page");
		const totalPage = await res.text();
		return totalPage;
	} catch (e) {
		console.log(e);
	}
};
