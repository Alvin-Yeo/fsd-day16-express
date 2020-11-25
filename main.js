// load modules
const express = require('express');
const cors = require('cors');

const cart = [
    { id: '1', item: 'apple', qty: 10 },
    { id: '2', item: 'orange', qty: 5 },
    { id: '3', item: 'pear', qty: 8 },
    { id: '4', item: 'grapes', qty: 22 },
];

// configure environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

// create an instance of express
const app= express();

// Add CORS header to the response
app.use(cors());
app.use(express.json());    // convert the json object to req.body

// create resources
app.get('/cart', (req, res) => {
    res.status(200);
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.type('application/json');
    res.json(cart);
});

app.get('/cart/:id', (req, res) => {
    const id = req.params.id;
    const result = cart.find(x => x.id === id);
    
    res.type('application/json');
    
    if(result === undefined) {
        res.status(404);
        res.json({ '404': 'Item not found.' });
        return;
    }

    res.status(200);
    res.json(result);
});

app.put('/cart/:id', (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    // console.log('Payload: ', payload);

    const index = cart.findIndex(x => x.id === payload.id);
    if(index < 0)
        cart.push(payload);
    else
        cart[index] = payload;

    res.status(200);
    res.type('application/json');
    res.json({"Message": "Update done!"});
});

// start server
app.listen(PORT, () => {
    console.log(`Application started on port ${PORT} at ${new Date()}`);
});