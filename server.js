const express = require('express');
const app = express();

const PORT = 3000;
app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}!`);
});

app.get('/roll/:number', (req, res) => {
  const number = parseInt(req.params.number);
  if (isNaN(number)) {
    return res.send("You must specify a number.");
  }
  const rolledNumber = Math.floor(Math.random() * (number + 1));
  res.send(`You rolled a ${rolledNumber}.`);
});
//Collectibles route
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
      return res.send("This item is not yet in stock. Check back soon!");
    }
    const item = collectibles[index];
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
  });
  //filter shoes by param
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
app.get('/shoes', (req, res) => {
  const minPrice = parseFloat(req.query['min-price']);
  const maxPrice = parseFloat(req.query['max-price']);
  const type = req.query.type;

  let filteredShoes = shoes;

  if (!isNaN(minPrice)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }
  if (!isNaN(maxPrice)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }
  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.json(filteredShoes);
});


app.get('/collectibles/:index', (req, res) => {
 const index = parseInt(req.params.index);
 if(isNaN(index)||index<0|| index >= collectibles.length)
    return res.send('This item is not yet in stock. Check back soon!')
});
 
// Create the /shoes route with filtering logic
app.get('/shoes', (req, res) => {
    // Extract query parameters from the request
    const { type, color, size } = req.query;
  
    // Filter shoes based on query parameters
    let filteredShoes = shoes;
  
    if (type) {
      filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
    }
    if (color) {
      filteredShoes = filteredShoes.filter(shoe => shoe.color.toLowerCase() === color.toLowerCase());
    }
    if (size) {
      filteredShoes = filteredShoes.filter(shoe => shoe.size === parseInt(size));
    }
  
    // If no shoes match the filters, return a message
    if (filteredShoes.length === 0) {
      return res.send('No shoes found matching your criteria.');
    }
  
    // Return the filtered shoes
    res.json(filteredShoes);
  });
  

app.listen(PORT, () => {
    console.log(`Server is running and listening on http://localhost:${3000}`)})