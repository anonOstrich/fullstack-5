import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove }) => {

  const [verbose, setVerbose] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showOnVerbose = { display: verbose ? '' : 'none' }

  const toggleVerbosity = () => {
    setVerbose(!verbose)
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVerbosity} className='blogInfo'>
        {blog.title} {blog.author}
        <div>
          <div style={showOnVerbose} className='extraInfo'>
            <a href={blog.url}>{blog.url}</a><br/>
            {blog.likes} likes <button onClick={handleLike}>like</button> <br/>
      added by  {blog.user ? blog.user.name : 'unknown'} <br/>
            {handleRemove ?
              <button onClick={handleRemove}>remove</button>
              : <></>
            }
          </div>
        </div>
      </div>
    </div>
  )}

Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog