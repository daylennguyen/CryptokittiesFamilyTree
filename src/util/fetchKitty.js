// good example kitty small tree 922339
// medium tree - 1812122
import React from 'react';
import { Node, Edge } from '@lifeomic/react-vis-network';
// ex. kitty url
// https://www.cryptokitties.co/kitty/1828056
const FETCH_INTERVAL = 300, // how often we make a fetch to the api
	STEP_CONVERT_TO_ELEMENTS = 2,
	apiURL = 'https://api.cryptokitties.co/kitties/',
	kittyAnchor = '/kitty/',
	invalidKittyAlert = (kittyid) =>
		`Invalid Kitty - Kitty Not Found!\n\nNo Kitty Found at:\nhttps://api.cryptokitties.co/kitties/${kittyid}\n\nPlease enter a valid kitty id`;
export function checkForFullKittyAddress(address)
{
	let result = false;
	if (address.includes(kittyAnchor))
	{
		result = true;
	}
	return result;
}

export function fullAddressToShortID(address)
{
	let result = address.slice(
		address.lastIndexOf(kittyAnchor) + kittyAnchor.length
	);
	return result;
}

function makeEdgeComponent(json)
{
	const result = (<Edge key={ json.id } id={ json.id } from={ json.from } to={ json.to } />);
	return result;
}

// create the kitty node to be inserted into the graph
function makeNodeComponent(json)
{
	// console.log(json);
	return (
		<Node
			id={ `${json.id}` }
			key={ `${json.key}` }
			title={ `(Gen. ${json.gen}) (${
				json.name !== null ? json.name : '#' + json.id
				})` }
			level={ json.gen }
			shape="image"
			size={ 100 }
			image={ json.img }
		/>
	);
}

// removes unnecessary data from kitty json given by api
const ExtractNode = (jsonKitty) =>
{
	return {
		id: jsonKitty.id,
		key: jsonKitty.id,
		img: jsonKitty.image_url_png,
		gen: jsonKitty.generation,
		name: jsonKitty.name,
	};
};
// pass the child, it will return an object containing the JSON that will be converted to edges
const ExtractEdge = (jsonKitty, edgeid) =>
{
	return {
		matron: {
			from: jsonKitty.id,
			to: jsonKitty.matron.id,
			id: edgeid + 1,
		},
		sire: { from: jsonKitty.id, to: jsonKitty.sire.id, id: edgeid },
	};
};

// perform breadth first search to retrieve the ancestors of our kitties
export async function asyncGetKittyJSON(
	kittyid,
	callback,
	setCount,
	setActiveStep
)
{
	//Array of JSON objects to be converted in to Nodes within the graph
	var NodeArray = [], // id ,key ,label ,img
		// contains the edges for the graph (JSON OBJ)
		EdgeArray = [], // edges = id ,from ,to
		// holds the response, from fetching the matron and sire of each kitty.
		// the calls will end when this queue/array is empty.
		Kittyqueue = [];
	var idArray = [];
	var currentKitty,
		response = await fetch(apiURL + kittyid);
	var jsonForm = await response.text();
	try
	{
		jsonForm = JSON.parse(jsonForm);
	} catch (error)
	{
		// jsonForm = null;
		if (jsonForm === 'Not Found' || jsonForm === 'Bad Request')
		{
			alert(invalidKittyAlert);
			jsonForm = null;
		}
		setActiveStep(0);
	}
	if (jsonForm !== null)
	{
		// kitty queue is initialized with the ck corresponding to the user input
		Kittyqueue.push(jsonForm);
		// idArray.push(jsonForm.id);

		// initialize with 420, because funny number. haha
		var edgeIdCount = 420;

		var fetchingCKOnInterval = setInterval(async () =>
		{
			if (Kittyqueue.length > 0)
			{
				currentKitty = Kittyqueue.shift();
				// check for unique node
				if (!idArray.includes(currentKitty.id))
				{
					NodeArray.push(ExtractNode(currentKitty));
					idArray.push(currentKitty.id);
				}
				else
				{
					console.warn('duplicate id detected: ' + currentKitty.id);
				}
				// generation 0 kitties dont have parents :'(
				if (currentKitty.generation > 0)
				{

					let curredge = ExtractEdge(currentKitty, edgeIdCount += 2);
					idArray.push(curredge['matron'].id, curredge['sire'].id);
					EdgeArray.push(curredge['matron']);
					EdgeArray.push(curredge['sire']);
					try
					{
						let response = await fetch(apiURL + curredge['matron'].to);
						let jsonForm = await response.json();
						Kittyqueue.push(jsonForm);
					} catch (err)
					{
						console.error('Error while fetching matron', err);
					}
					try
					{
						let response = await fetch(apiURL + curredge['sire'].to);
						let jsonForm = await response.json();
						Kittyqueue.push(jsonForm);
					} catch (err)
					{
						console.error('Error while fetching sire', err);
					}
				}
				setCount(NodeArray.length);
			} else
			{
				clearInterval(fetchingCKOnInterval);
				setActiveStep(STEP_CONVERT_TO_ELEMENTS);
				// make all of the graph nodes/components
				let KittyNodeComponents = [],
					KittyEdgeComponents = [];
				// STEP_CONVERT_TO_ELEMENTS
				for (const nodeJson in NodeArray)
				{
					KittyNodeComponents.push(makeNodeComponent(NodeArray[nodeJson]));
					setCount(nodeJson);
				}

				for (const edgeJson in EdgeArray)
				{
					KittyEdgeComponents.push(makeEdgeComponent(EdgeArray[edgeJson]));
					setCount(edgeJson);
				}
				try { callback(KittyNodeComponents, KittyEdgeComponents, jsonForm); } catch (err) { console.err(err); }

				setActiveStep(4);
			}
		}, FETCH_INTERVAL);
	}
}
