import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./PlaceForm.css";

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

const UpdatePlace = () => {
	const [isLoading, setIsLoading] = useState(true);
	const placeId = useParams().placeId;
	const [formState, inputHandler, setFromData] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
		},
		false
	);
	const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

	useEffect(() => {
		if (identifiedPlace) {
			setFromData(
				{
					title: {
						value: identifiedPlace.title,
						isValid: true,
					},
					description: {
						value: identifiedPlace.description,
						isValid: true,
					},
				},
				true
			);
		}

		setIsLoading(false);
	}, [setFromData, identifiedPlace]);

	const placeUpdateSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs);
	};

	if (!identifiedPlace) {
		return (
			<div className="center">
				<Card>
					<h2>Could not find place</h2>
				</Card>
			</div>
		);
	}
	if (isLoading) {
		return (
			<div className="center">
				<h2>Loading.....</h2>
			</div>
		);
	}
	return (
		formState.inputs.title.value && (
			<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
				<Input
					id="title"
					element="input"
					type="text"
					label="Title"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid title"
					onInput={inputHandler}
					initialValue={formState.inputs.title.value}
					initialIsValid={formState.inputs.title.isValid}
				/>
				<Input
					id="description"
					element="textarea"
					label="Desscription"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid description(at least 5 characters)"
					onInput={inputHandler}
					initialValue={formState.inputs.description.value}
					initialIsValid={formState.inputs.description.isValid}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					UPDATE PLACE
				</Button>
			</form>
		)
	);
};

export default UpdatePlace;
