const baseUrl = 'http://192.168.11.5:3005';

export const getCovers = async (page: string, type: 'ero' | 'manga') => {
	try {
		const res = await fetch(`${baseUrl}/${type}/page/${page}`);
		const covers: string[] = await res.json();
		return covers;
	} catch (e) {
		console.log(e);
	}
};

export const getAuthor = async (author: string, type: 'ero' | 'manga') => {
	try {
		const res = await fetch(`${baseUrl}/${type}/author/${author}`);
		const authors: string[] = await res.json();
		return authors;
	} catch (e) {
		console.log(e);
	}
};

export const getBook = async (path: string, type: 'ero' | 'manga') => {
	try {
		const res = await fetch(`${baseUrl}/${type}/book/${path}`);
		const books: string[] = await res.json();
		return books;
	} catch (e) {
		console.log(e);
	}
};

export const getTotalPage = async (type: 'ero' | 'manga') => {
	try {
		const res = await fetch(`${baseUrl}/${type}/total-page`);
		const totalPage = await res.text();
		return totalPage;
	} catch (e) {
		console.log(e);
	}
};
