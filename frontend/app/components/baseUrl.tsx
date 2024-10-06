export const getBaseUrl = (request: Request) => {
    const hostname = request.headers.get('host')
	let baseUrl = "https://my-box-image.daichi2mori.com";
	if (hostname !== 'my-box.daichi2mori.com') {
		baseUrl = `http://${hostname?.slice(0, -1)}5`;
	}

    return baseUrl;
}