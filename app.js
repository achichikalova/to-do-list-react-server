const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { Pool } = require('pg');
const dbConfig = require('./dbConfig');
const db = new Pool(dbConfig);

app.get('/', (req, res) => {
  res.send('Test');
})

app.get('/api/tasks', (req, res) => {
  const query = `SELECT * FROM tasks;`;

  db.query(query)
    .then(data => {
      const tasks = data.rows;
      res.status(200)
         .json({ tasks });
    })
    .catch(err => {
      res.status(500)
         .json({ error: err.message });
    })
})

app.post('/api/tasks', (req, res) => {
  const { text, id, complete } = req.body;
  const query = `INSERT INTO tasks (text, id, complete) VALUES ($1, $2, $3);`;
  const queryParams = [text, id, complete];

  db.query(query, queryParams)
    .then(() => {
      res.status(200)
         .json({ success: true });
    })
    .catch(err => {
      res.status(500)
         .send({ error: err.message });
    })
})

app.delete('/api/tasks/:id', (req, res) => {
  const task_id = req.params.id;
  const query = `DELETE FROM tasks WHERE id = $1`;
  db.query(query, [task_id])
    .then(() => {
      res.status(200)
         .json({ success: true });
    })
    .catch(err => {
      res.status(500)
         .send({ error: err.message });
    })
})

app.put('/api/tasks/:id', (req, res) => {
  const { id, complete } = req.body;
  const query = `UPDATE tasks SET complete = $2 WHERE id = $1;`;
  const queryParams = [id, complete];
  db.query(query, queryParams)
    .then(() => {
      res.status(200)
         .json({ success: true });
    })
    .catch(err => {
      res.status(500)
         .send({ error: err.message });
    })
})

app.listen(process.env.PORT || 3001, () => {
  console.log('ToDo app listening on PORT 3001');
})