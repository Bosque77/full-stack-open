import React, { useState } from 'react'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'


const Blog = ({ blog,addBlogLike, username }) => {
  const dispatch = useDispatch()
  const [display, setDisplay] = useState(false)
  const display_info = { display: display ? '' : 'none' }
  const display_delete_button = { display: username === blog.user.username ? '' : 'none' }



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    let new_display = display ? false : true
    setDisplay(new_display)
  }


  const displayButton = () => {
    if(display){
      return( <button id='hide-blog' onClick={toggleVisibility}> hide </button> )
    }else{
      return( <button id='view-blog' onClick={toggleVisibility}> view </button> )
    }
  }

  // const onDeleteHandler = () => {
  //   deleteBlog(blog.id)
  // }

  const deleteBlogID = async () => {
    dispatch(deleteBlog(blog.id))
    dispatch(setNotification('Successfully Deleted a blog', 3))
  }


  return (
    <div style={blogStyle} className='blog-class'>
      <div className='blogTitle'>{blog.title}</div>
      <div className='blogAuthor'>{blog.author} </div>
      {displayButton()}
      <div style={display_info} className='blog-content'>
        <div> {blog.url} </div>
        <div className='num-of-likes'> {blog.likes} <button id='like-blog' onClick={() => addBlogLike(blog)}>like</button> </div>
        <button id='delete-blog' style={display_delete_button} onClick={deleteBlogID}>Delete Blog</button>
      </div>
    </div>
  )
}



export default Blog