const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});