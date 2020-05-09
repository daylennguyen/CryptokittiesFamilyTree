// https://api.ckbox.co/cattributes
// https://api.ckbox.co/kitties?id=
const cattributes_url = 'https://api.ckbox.co/cattributes';
const ckbox_url = 'https://api.ckbox.co/kitties?id=';

export async function fetchCattributes(callback: any) {
	// Fix for the blocker, "blocked by cors policy"
	// we use a proxy service to insert _CORS headers_ into the ckbox response
	fetch(`https://cors-anywhere.herokuapp.com/${cattributes_url}`, {
		method: 'GET',
		headers: {
			origin: document.location.href,
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			// console.log(json);
			callback(json);
		})
		.catch((err) => {
			console.log(err);
		});
}
// Function to fetch and decipher the CKBox data for a specific kitty
export async function fetchKittyGenetics(
	kittyId: number,
	cattribute_legend: any
) {
	fetch(`https://cors-anywhere.herokuapp.com/${ckbox_url}${kittyId}`, {
		method: 'GET',
		headers: {
			origin: document.location.href,
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((trait_data) => {
			// json[0] contains an array (len:12)
			// each index contains a legend for decrypting the kitty genes:
			// { api_desc: [string], api_type: string, codex_type: string, gen0_pos: [number], gene_desc: [string], group_n: num, group_tag: string}
			var arr = KittyDecode(cattribute_legend, trait_data);
			// console.log(arr)
			return arr;
		})
		.catch((err) => {
			console.log(err);
		});
}

const KittyDecode = (cattribute_legend, trait_data) => {
	var result: string[][] = [];
	// kitty trait table will be a 12x4 2D Array
	for (let index = 1; index <= 12; index++) {
		var currentTraitRow: string[] = [];
		for (const trait_num of trait_data[0][`g${index}`]) {
			currentTraitRow.push(
				// check if the trait has a name defined in the legend
				cattribute_legend[index - 1]['api_desc'][trait_num] === null
					? `${
						// if it doesn't, append and pad the trait number to the geneType/group_tag. Ex: WE05
							cattribute_legend[index - 1]['group_tag']
					  }${trait_num.toString().padStart(2, '0')}`
					: cattribute_legend[index - 1]['api_desc'][trait_num]
			);
		}
		result.push(currentTraitRow);
	}
	console.log(result)
	return result;
};
