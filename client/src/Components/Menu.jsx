/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Menu = ({cat,postId}) => {

      const navigate = useNavigate()
      const [posts,setPosts] = useState([])
      useEffect(()=>{
        const getData = async()=>{
          try {
            const res = await axios.get(`http://localhost:3005/api/posts?cat=${cat}`, {
              withCredentials: true,
            })
            setPosts(res.data)
            
          } catch (err) {
            console.log(err)
          }
        }
        getData()
      },[cat])
  return (
    <div className="menu">
    <h1>Other posts you may like</h1>
    {posts?.filter(item=>item.id !== postId).map((post) => (
      <div className="post" key={post.id}>
        <img src={`../upload/${post?.img}`} alt="" />
        <h2>{post.title}</h2>
        <button onClick={()=>navigate(`/post/${post.id}`)}>Read More</button>
      </div>
    ))}
  </div>
  )
}

export default Menu