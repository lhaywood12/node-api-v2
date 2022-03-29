const express = require('express')
const { redirect } = require('express/lib/response')
const router = require('./router')
const server = express()
const port = process.env.PORT || 3000

//create connection
const mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sakila'
})

// connect to database
con.connect((error)=> {
    if(!error) {
        console.log('Database is connected...')
    } else {
        console.log('Error', error)
    }
})

//root route
server.get('/', (req, res) => {
    res.json ({
        'All Actors': `http://localhost:${port}/api/actor`,
        'Categories': `http://localhost:${port}/api/category`,
        'Store': `http://localhost:${port}/api.store`,
        'All Staff': `http://localhost:${port}/api/staff`,
        'All films': `http://localhost:${port}/api/film`
    })
})

//all route
//category
server.get('/api/category', (req, res)=> {

    //run query on connection
    con.query(
        'SELECT * FROM category',
        (error, rows) => {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

//customer
server.get('/api/customer', (req, res) => {
    con.query(
        'SELECT * FROM customer ORDER BY last_name, first_name, rental',
        (error, rows) => {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})


// actor
server.get('/api/actor', (req, res) => {
    con.query(
        'SELECT * FROM actor ORDER BY last_name, first_name',
        (error, rows) => {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

//film
server.get('/api/film', (req, res) => {
    con.query(
    'SELECT * FROM film ORDER BY title',
    (error, rows) => {
        if(!error) {
            if(rows.length === 1) {
                res.json(...rows)
            } else {
                res.json(rows)
            }
        } else {
            console.log('Error', error)
        }
      }
    )
})

//store
server.get('/api/store', (req, res)=> {
    con.query(
        'SELECT * FROM store',
        (error,rows) => {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

//staff
server.get('/api/staff', (req, res)=> {
    con.query(
        'SELECT staff_id, first_name, last_name FROM staff ORDER BY last_name, first_name',
        (error, rows) => {
            if(!error) {
                if(rows.length === 1) {
                res.json(...rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

//single route
server.get('/api/film/:id', (req, res)=> {
    const id = req.params.id
    con.query(
        `SELECT * FROM film WHERE film_id = ${id}`,
        (error, rows) => {
          if(!error) {
            if(rows.length === 1) {
                res.json(...rows)
            } else {
                res.json(rows)
            }
        } else {
            console.log('Error', error)
           }
        }
    )
})


server.set('view engine', 'ejs')

server.use('/', router)

//listener
server.listen(port, ()=> console.log(`Port ${port}`)) 