import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()
const password = process.env.PASSWORD;
export const db  = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:password,
    database:"blog"
})