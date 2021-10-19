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
    database: 'animals' 
})

con.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Yes!');
})






// Iraso nauja posta
// INSERT INTO table_name (column1, column2, column3,...)
// VALUES (value1, value2, value3,...)
app.post('/cow_farm', (req, res) => {  //DB pavadinimas?
    console.log(req.body.name)
    const sql = `
        INSERT INTO cow_farm 
        (name, weight, total_milk, last_milking_time)
        VALUES (?, ?, ?, ?)
        `;
    con.query(sql, [req.body.name, req.body.weight, req.body.total_milk, req.body.last_milking_time], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

// Trina posta
// DELETE FROM table_name
// WHERE some_column = some_value
app.delete('/cow_farm/:id', (req, res) => {
    const sql = `
        DELETE FROM cow_farm
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
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
app.put('/cow_farm/:id', (req, res) => {
    const sql = `
        UPDATE cow_farm
        SET name = ?, weight = ?, total_milk = ?, last_milking_time = ?
        WHERE id = ?
        `;
    con.query(sql, [req.body.name, req.body.weight, req.body.total_milk, req.body.last_milking_time, req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})


// rodo visus postus
app.get('/cow_farm', (req, res) => {
    con.query('SELECT * FROM cow_farm ORDER BY id DESC', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})

// skaiciuoja irasus
// SELECT COUNT(ProductID) AS NumberOfProducts FROM Products; 
app.get('/cow_farm/count', (req, res) => {
    con.query('SELECT COUNT(id) as cow_farmCount FROM cow_farm', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})