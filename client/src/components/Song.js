import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Song = () => {
	const { id } = useParams();

	const fetchSong = async ({ queryKey }) => {
		// console.log("Query Parameters", queryKey);
		const res = await fetch(`/api/songs/${queryKey[1]}`);
		return res.json();
	};

	const { data, isLoading } = useQuery(["fetchSong", Number(id)], fetchSong);

	if (isLoading) return <p>Loading... Please wait!</p>;
	return (
		<div>
			<h3>{data?.artiste}</h3>
			<p>{data?.title}</p>
		</div>
	);
};

export default Song;
