const baseUrl = 'http://localhost:3005';

export const getCovers = async (page: string) => {
	try {
		const res = await fetch(`${baseUrl}/page/${page}`);
		const covers: string[] = await res.json();
		return covers;
	} catch (e) {
		console.log(e);
	}
};

export const getAuthor = async (author: string) => {
	try {
		const res = await fetch(`${baseUrl}/author/${author}`);
		const authors: string[] = await res.json();
		return authors;
	} catch (e) {
		console.log(e);
	}
};

export const getBook = async (path: string) => {
	try {
		const res = await fetch(`${baseUrl}/book/${path}`);
		const books: string[] = await res.json();
		return books;
	} catch (e) {
		console.log(e);
	}
};

export const getTotalPage = async () => {
	try {
		const res = await fetch(`${baseUrl}/total-page`);
		const totalPage = await res.text();
		return totalPage;
	} catch (e) {
		console.log(e);
	}
};
