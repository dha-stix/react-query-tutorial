import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [artiste, setArtiste] = useState("");
	const [title, setTitle] = useState("");
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const handleRoute = (id) => navigate(`song/${id}`);

	//👇🏻 GET request functions
	const fetchFavouriteSongs = async () => {
		const res = await fetch("/api");
		return res.json();
	};
	const { data, isLoading, isError, error } = useQuery(
		["fetchFavouriteSongs"],
		fetchFavouriteSongs
	);

	//👇🏻 POST request functions
	const handleAddSong = async (song) => {
		const request = await fetch("/api/add", {
			method: "POST",
			body: JSON.stringify(song),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		const response = await request.json();
		setTitle("");
		setArtiste("");
		return response;
	};

	const mutation = useMutation(handleAddSong, {
		onSuccess: () => {
			queryClient.invalidateQueries(["fetchFavouriteSongs"]);
		},
	});
	const handlePOST = (e) => {
		e.preventDefault();
		mutation.mutate({ artiste, title });
	};

	// 👇🏻 Error Handling & Checks if the data state is still loading from the server
	if (isLoading) return <p>Fetching your favourite songs...</p>;

	if (isError) return <p>Error fetching songs {error?.message}</p>;
	return (
		<div className='container'>
			{mutation.isSuccess ? (
				<div className='song__added'>Song added!🎉</div>
			) : null}
			{mutation.isError ? <div>ERROR!</div> : null}

			<h2>My Favourite Songs</h2>
			<h3>Add New Song</h3>
			<form className='form' onSubmit={handlePOST}>
				<label htmlFor='artiste'>Artiste</label>
				<input
					type='text'
					value={artiste}
					name='artiste'
					id='artiste'
					onChange={(e) => setArtiste(e.target.value)}
					required
				/>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					value={title}
					name='title'
					id='title'
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<button>ADD SONG</button>
			</form>

			<div className='songs__container'>
				<h3>Songs List</h3>
				<div className='songs__list'>
					{data?.map((song, index) => (
						<div
							className='song__item'
							key={`${song.artiste}${Math.random()}`}
							onClick={() => handleRoute(index + 1)}
						>
							<p>{song.artiste}</p>
							<p>{song.title}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
