const express = require('express');
const app = express();
const port = 3000;
app.use(express.json())
const players = [
    {
        id: 1,
        name: "Harshith",
        team: "India"
    },
    {
        id: 2,
        name: "Pranit",
        team: "India"
    },
    {
        id: 3,
        name: "Adithya",
        team: "Australia"
    }
];

app.get("/players", (req, res) => {
    const team = req.query.team;

    if (!team) {
        return res.json(players);
    }

    const filteredPlayers = players.filter(
        (player) => player.team === team
    );

    res.json(filteredPlayers);
});

app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/products', (req, res) => {
    res.send("All products");
});

app.get("/player/:id", (req, res) => {
    const id = Number(req.params.id);

    const player = players.find((player) => player.id === id);

    if (!player) {
        return res.status(404).json({
            error: "Player not found"
        });
    }

    res.json(player);
});
app.get("/players1", (req, res) => {
    console.log(req.query);

    res.json(req.query);
});
app.get('/products/1', (req, res) => {
    res.send("All products 1");
});

app.get('/products/:id', (req, res) => {
    res.send(`product id is ${req.params.id}`);
});
app.post('/players',(req,res)=>{
    const newPlayer={
        id:players.length+1,
        name:req.body.name
    }
    players.push(newPlayer);
    res.status(201).json(newPlayer);
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});