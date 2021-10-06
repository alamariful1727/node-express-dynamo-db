const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const { getAllItems, insertOrUpdateItem } = require('./dynamo');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

const TABLE_NAME = 'test-crud-arif';

app.get('/', (req, res) => {
	res.send('Hello CRUD World');
});

app.get('/items', async (req, res) => {
	try {
		const items = await getAllItems(TABLE_NAME);
		res.status(200).json(items);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message || 'Something went wrong' });
	}
});

app.post('/items', async (req, res) => {
	const body = req.body;
	try {
		body.id = uuidv4();
		const newItem = await insertOrUpdateItem(TABLE_NAME, body);
		console.log('newItem', newItem);
		res.status(200).json(body);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message || 'Something went wrong' });
	}
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
