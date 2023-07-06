import { userInfo } from 'os';
import {db} from '../db/db.js'
import jwt from 'jsonwebtoken'

export const getposts =(req,res)=>{
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

db.query(q,[req.query.cat],(err,data)=>{
    if(err) return res.json(err)
    return res.status(200).json(data)
})
}

export const getpost =(req,res)=>{
const q =
  "SELECT p.id, `username`,`title`,`desc`,p.img, u.img AS userImg,`cat`,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?";
db.query(q,[req.params.id],(err,data)=>{
if (err) return res.json(err);
return res.status(200).json(data[0])
})
}

export const addpost =(req,res)=>{
    const token = req.cookies.access_token;
if(!token) return res.status(401).json('Not authorized')

    jwt.verify(token,'jwtKey',(err,userInfo)=>{
    if (err) return res.status(403).json('token is not valid!');
    const q =
      "INSERT INTO posts (`title`,`desc`,`img`,`date`,`cat`,`uid`) VALUES (?)";
      const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.date,
        req.body.cat,
        userInfo.id,
    ];
    db.query(q,[values],(err,data)=>{
           if (err) return res.status(500).json(err);
           return res.json("Post has been created.");
    })
    });
}

export const deletepost =(req,res)=>{

const token = req.cookies.access_token;
if(!token) return res.status(401).json('Not authorized')

    jwt.verify(token,'jwtKey',(err,userInfo)=>{
    if (err) return res.status(403).json('token is not valid!');
        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
        db.query(q,[postId,userInfo.id],(err,data)=>{
            if (err) return res.status(403).json("You can delete only your post!");
            return res.json("Post has been deleted!");
        })
})
}

export const updatepost =(req,res)=>{
     const token = req.cookies.access_token;
if (!token) return res.status(401).json("Not authorized");

jwt.verify(token, "jwtKey", (err, userInfo) => {
  if (err) return res.status(403).json("token is not valid!");
  const postId = req.params.id;
  const q =
    "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
  ];
  db.query(q, [...values, postId, userInfo.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been updated.");
  });
});
}
