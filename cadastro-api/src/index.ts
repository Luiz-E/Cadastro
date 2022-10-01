import express from "express"
import {RunResult} from "sqlite3"
import database from "./database"

const port = 8080
const app = express()
const session: any = {}

app.use(express.json())
app.use("/", express.static("../Cadastro/dist"))

app.get("/api/users", (req, res) => {
    const sql = "SELECT * FROM user"

    database.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message})
            return
        }
        res.json({
            "message": "success",
            "data": rows
        })
    })
})

app.get("/api/user/:id", (req,res) => {
    const sql = "SELECT * FROM user WHERE id = ? "

    database.get(sql, [req.params.id], (err,row) => {
        if (err) {
            res.status(400).json({"error": err.message})
            return
        }

        res.json({
            "message": "success",
            "data": row
        })
    })
})

app.post("/api/user", (req, res) => {
    
    const errors = []
    if (!req.body.password) {
        errors.push("No password specified")
    }
    if (!req.body.email) {
        errors.push("No email specified")
    }
    if (errors.length) {
            res.status(400).json({"error": errors.join()})
            return
    }

    const {name, birthDate, cpf, password, tel, secondTel, email, cep, uf, city, district, street} = req.body
    const sql = `INSERT INTO user 
                (name, birthDate, cpf, password, tel, secondTel, email, cep, uf, city, district, street) VALUES 
                (?,?,?,?,?,?,?,?,?,?,?,?)`
    const params = [name, birthDate, cpf, password, tel, secondTel, email, cep, uf, city, district, street]

    database.run(sql, params , function (this: RunResult, err) {
        if (err) {
            res.status(400).json({"error": err.message})
            return
        }

        res.json({
            "message": "success",
            "id": this.lastID
        })
    })
})


app.listen(port, () => console.log(`⚡Server running on port ${port}`))