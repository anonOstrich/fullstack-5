import React, {useState} from 'react'

const Blog = ({ blog }) =>{

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
      {blog.likes} likes <button>like</button> <br/>
      added by {blog.hasOwnProperty('user') ? blog.user.name : 'unknown'} <br/>
      </div>
    </div>
    </div>
  </div>
)}

export default Blog