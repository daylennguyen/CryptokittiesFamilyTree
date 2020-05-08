// https://api.ckbox.co/cattributes
// https://api.ckbox.co/kitties?id=

export async function fetchCattributes(callback: any) {
	const url = 'https://api.ckbox.co/cattributes';
	// Fix for the blocker, "blocked by cors policy"
	// we use a proxy service to insert _CORS headers_ into the ckbox response
	fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
		method: 'GET',
		headers: {
			origin: document.location.href,
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			console.log(json);
			callback(json);
		})
		.catch((err) => {
			console.log(err);
		});
}
export async function fetchKittyGenetics(props: { kittyId: number }) {
	var response = await fetch(
		`https://api.ckbox.co/kitties?id=${props.kittyId}`
	);
	var json = await response.json();
	return json;
}
