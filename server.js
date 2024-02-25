const express = require('express');
const app = express();

const loaders = require('./loaders');

async function startServer() {

    const port = process.env.PORT || 8000;

    loaders(app);

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
};

startServer();