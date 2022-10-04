import express from "express"
import {RunResult} from "sqlite3"
import database from "./database"

const port = 8080
const app = express()
const session: any = {}

app.use(express.json())
app.use("/", express.static("../Cadastro/dist"))
app.use("/login", express.static("../Cadastro/dist"))
app.use("/signup", express.static("../Cadastro/dist"))

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
    const sql = "SELECT email, password FROM user WHERE id = ? "

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
            console.log(name, birthDate, cpf, password, tel, secondTel, email, cep, uf, city, district, street)
            res.status(400).json({"error": err.message})
            return
        }

        res.json({
            "message": "success",
            "id": this.lastID
        })
    })
})

app.post("/api/makelogin", (req,res) => {
    const sql = "SELECT id, name, email, birthDate, cpf, password, tel, secondTel, cep, uf, city, district, street FROM user WHERE email = ? AND password = ?"
    const {email, password} = req.body

    database.get(sql, [email, password], (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message})
            return
        }

        if (!row) {
            res.status(400).json({"message": "no user"})
            return
        }
        require('crypto').randomBytes(48, (err: any, buffer: any) => {
            const token = buffer.toString('hex')
            session[token] = row
            res.json({ "message":"success", "sesid": token })
         })
    })
})

app.post("/api/logged/:sesid", (req, res) => {
    
    res.json(session[req.params.sesid] || "nada")
 })

 app.delete("/api/user/:id", (req,res) => {
    const sql = "DELETE FROM user WHERE id = ?"
    database.run(sql, [req.params.id], 
        function(this: RunResult, err) {
            if (err) {
                res.status(400).json({"message": err.message})
                return
            }
            res.json({"message":"deleted", changes:this.changes})
        }
    )
 })
 

app.patch("/api/user/:id", (req, res) => {
    const {name, birthDate, cpf, password, tel, secondTel, email, cep, uf, city, district, street} = req.body
    const sql = `
      UPDATE user SET 
         name = COALESCE(?,name), 
         birthDate = COALESCE(?,birthDate), 
         cpf = COALESCE(?,cpf), 
         password = COALESCE(?,password), 
         tel = COALESCE(?,tel), 
         secondTel = COALESCE(?,secondTel), 
         email = COALESCE(?,email), 
         cep = COALESCE(?,cep), 
         uf = COALESCE(?,uf), 
         city = COALESCE(?,city), 
         district = COALESCE(?,district), 
         street = COALESCE(?,street) 
      WHERE 
         id = ?
         `
   database.run(sql, [name, birthDate, cpf, password, tel, secondTel, email, cep, uf, city, district, street, req.params.id],
    function(this: RunResult, err) {
        if (err) {
                console.log(err)
                res.status(400).json({"error": err.message})
                return
            }
            res.json({
                message: "success",
                data: {name, birthDate, cpf, password, tel, secondTel, email, cep, uf, city, district, street},
                changes: this.changes
            })
        }
   )
})

app.listen(port, () => console.log(`⚡Server running on port ${port}`))