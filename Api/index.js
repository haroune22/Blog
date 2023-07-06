import express from "express"
const app = express()
import postRoutes  from './Routes/posts.js'
import userRoutes  from './Routes/users.js'
import authRoutes  from './Routes/auth.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config();


app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())

 const storage = multer.diskStorage({
  destination: function(res,file,cb){
    cb(null,'../client/public/upload')
  },
  filename: function(res,file,cb){
    cb(null, Date.now() + file.originalname);
  }
 })
const upload = multer({storage})

app.post('/api/upload',upload.single('file'),function(req, res){
  const file =req.file
res.status(200).json(file.filename)
})

app.use('/api/posts',postRoutes)
app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`app is listening on ${process.env.PORT}`)
})