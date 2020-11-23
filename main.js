// load modules
const express = require('express');

const cart = [
    { item: 'apple', qty: 10 },
    { item: 'orange', qty: 5 },
    { item: 'pear', qty: 8 },
    { item: 'grapes', qty: 22 },
];

// configure environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

// create an instance of express
const app= express();

// create resources
app.get('/', (req, res) => {
    res.status(200);
    res.type('application/json');
    res.send(JSON.stringify(cart));
});

// start server
app.listen(PORT, () => {
    console.log(`Application started on port ${PORT} at ${new Date()}`);
});