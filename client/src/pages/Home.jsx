/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useLocation} from "react-router-dom"
import axios from "axios";


const Home = () => {

  const cat= useLocation().search
  const [posts,setPosts]=useState([])

  useEffect(()=>{
    const getData = async()=>{
      try {
        const res = await axios.get(`http://localhost:3005/api/posts${cat}`, {
          withCredentials: true,
        })
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[cat])

const getText = (html) =>{
  const doc = new DOMParser().parseFromString(html, "text/html")
  return doc.body.textContent
}

  return (
    <div className="home">
        <div className="posts">
          {posts?.sort((a,b)=> new Date(b.date ) - new Date(a.date)).map((post)=>(
            <div className="post" key={post.id}>
              <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
              </div>
              <div className="content">
                <h1>
                  {post.title}
                </h1>
                <p>{getText(post.desc)}</p>
                <Link to={`post/${post.id}`} className="link">
                <button>Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Home