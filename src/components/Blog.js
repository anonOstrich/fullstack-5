import React, {useState} from 'react'

const Blog = ({ blog, handleLike, handleRemove , currentUser}) =>{

  const [verbose, setVerbose] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showOnVerbose = { display: verbose ? '' : 'none'}

  const toggleVerbosity = () => {
    setVerbose(!verbose)
  }

  return (
  <div style={blogStyle}>
    <div onClick={toggleVerbosity}>
      {blog.title} {blog.author}
      <div>
      <div style={showOnVerbose}>
      <a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} likes <button onClick={handleLike}>like</button> <br/>
      added by  {blog.user ? blog.user.name : 'unknown'} <br/>
      {(!blog.user ||  blog.user.username === currentUser.username) ?
        <button onClick={handleRemove}>remove</button>    
        : <></>
      }
      </div>
    </div>
    </div>
  </div>
)}

export default Blog