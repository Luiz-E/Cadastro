import { Database } from "sqlite3";

const db = new Database(
    "db.sqlite",
    err => {
        if (err) 
            throw new Error(`Erro: ${err}`)
        db.run(
           `
            CREATE TABLE IF NOT EXISTS user (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                name        TEXT,
                birthDate   TEXT,
                cpf         TEXT UNIQUE,
                password    TEXT,
                tel         TEXT,
                secondTel   TEXT,
                email       TEXT UNIQUE,
                cep         TEXT,
                uf          TEXT,
                city        TEXT,
                district    TEXT,
                street      TEXT
            )
           `,
           err => {
            if (err) throw new Error(`Erro ao criar tabela: ${err}`)
            // const insert = "INSERT OR IGNORE INTO user (name, email, password) VALUES (?,?,?)"
            // db.run(insert, ["admin","admin@example.com","123132"])
            // db.run(insert, ["user","user@example.com","123321"])
           } 
        )
    }
)

export default db