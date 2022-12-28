import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
	const USERS = [
		{
			id: "u1",
			name: "Bekri Shifa",
			image:
				"https://render.fineartamerica.com/images/rendered/search/canvas-print/8/8/mirror/break/images-medium-5/finding-paradise-jennifer-lommers-canvas-print.jpg",
			places: 3,
		},
	];
	return <UsersList items={USERS} />;
};

export default Users;
