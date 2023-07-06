import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import moment from 'moment'
import DOMPurify from "dompurify";


const Single = () => {
  const {currentUser}=useContext(AuthContext)

  const location= useLocation()
  const postId = location.pathname.split("/")[2];

  const [post,setPost]=useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    const getData = async()=>{
      try {
        const res = await axios.get(`http://localhost:3005/api/posts/${postId}`, {
          withCredentials: true,
        })
        setPost(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[postId])

  const handleDelete =async()=>{
    try {
     await axios.delete(`http://localhost:3005/api/posts/${postId}`, {
        withCredentials: true,
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="single">
        <div className="content">
            <img src={`../upload/${post?.img}`}alt="" />
            <div className="user">
           { post?.userImg && <img src={post.userImg} alt="" />}
            <div className="info">
              <span>{post?.username}</span>
              <p>{moment(post?.date).fromNow()}</p>
            </div>
            {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
              <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
            )}
            </div>
            <h1>{post?.title} </h1>
            <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>   
        </div>
        <div className="menu">
          <Menu cat={post.cat} postId={post.id}/>
        </div>
    </div>
  )
}

export default Single