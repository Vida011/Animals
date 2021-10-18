const express = require('express')
const app = express()
const port = 3003
const mysql = require('mysql')
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'cow_farm'
})

con.connect(err => { //jungiamės prie DB
    if (err) {  // jeigu err
        throw err; //sakome atia
    }
    console.log('Yes!'); //jeigu pasisekė, tai consolėj išsiloginam, kad 'Taip'
})


// app.get('/', (req, res) => { // tai basic routeris
//   res.send('Hello World!')
// })

// app.get('/labas', (req, res) => { //rašom kelia, kuriuo nueit
//     res.send('Labas Antanai') // ir kas nutinka, kai nueinam tuo keliu
//   })

  //parametro perdavimas:
//   app.get('/labas/:id', (req, res) => { //rašom ko norim
//     res.send(`Pats tu ${req.params.id}`); //ka gaunam
//   })
  //iraso nauja post'a
//   INSERT INTO table_name (column1, column2, column3,...)
// VALUES (value1, value2, value3,...) 
app.post('/posts', (req, res) => {
    console.log(req.body.title)
    const sql = `
        INSERT INTO posts
        (title, body)
        VALUES (?, ?)
        `;
    con.query(sql, [req.body.title, req.body.body], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

//Redagavimas
// UPDATE table_name
// SET column1=value, column2=value2,...
// WHERE some_column=some_value 
app.put('/posts/:id', (req, res) => {
    const sql = `
        UPDATE posts
        SET title = ?, body = ?
        WHERE id = ?
        `;
    con.query(sql, [req.body.title, req.body.body, req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})


  // rodo visus postus
  app.get('/posts', (req, res) => {
    con.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            throw err;
        }
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
        res.json(results);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})