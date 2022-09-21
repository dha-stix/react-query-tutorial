const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const favouriteSongs = [
	{
		artiste: "Burna Boy",
		title: "Last Last",
	},
	{
		artiste: "Asake",
		title: "Sungba",
	},
	{
		artiste: "Oxlade",
		title: "KU LO SA",
	},
	{
		artiste: "Fireboy DML",
		title: "Peru",
	},
	{
		artiste: "Wizkid ft Temz",
		title: "Essence",
	},
];

app.get("/api", (req, res) => {
	res.json(favouriteSongs);
});

app.post("/api/add", (req, res) => {
	favouriteSongs.unshift(req.body);
	return res.json({
		message: "Successfully updated",
		data: favouriteSongs,
	});
});

app.get("/api/songs/:id", (req, res) => {
	if (req.params.id <= favouriteSongs.length) {
		res.json(favouriteSongs[req.params.id - 1]);
	} else {
		res.json({ error: "Index does not exist" });
	}
});

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
