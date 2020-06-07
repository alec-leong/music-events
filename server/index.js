const colors = require('colors');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

/* ======================================= Express server ======================================= */

const PORT = 3000;

// create express application
const app = express();

// enable cors
app.use(cors());

// compression middleware
app.use(compression());

app.use(express.urlencoded({ extended: false }));

// set 'Content-Type' middleware will parse
app.use(express.json());

// logger
app.use(morgan('dev'));

// serving static file
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => console.log(`Express server listening on port ${colors.green(PORT)}`));

/* ==================================== HTTP request handlers =================================== */

