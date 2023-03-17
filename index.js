require('dotenv').config();

const serveIndex = () => {
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 80;

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

serveIndex();