import React from "react";

import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
	{
		id: "p1",
		title: "Empire State Building",
		description: "One of the most famous sky scrappers in the world",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg",
		address: "20 W 34th St., New York, NY 10001",
		location: {
			lat: 40.748492,
			lng: -73.985699,
		},
		creator: "u1",
	},
	{
		id: "p2",
		title: "Emp. State Building",
		description: "One of the most famous sky scrappers in the world",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
		address: "20 W 34th St., New York, NY 10001",
		location: {
			lat: 40.748492,
			lng: -73.985699,
		},
		creator: "u2",
	},
];

const UserPlaces = () => {
	const userId = useParams().userId;
	const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
	return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
