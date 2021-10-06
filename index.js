const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.send('Hello CRUD World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
