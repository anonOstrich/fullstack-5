import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const login = async (event) => {
    event.preventDefault()
    try{

    const createdUser = await loginService.sendLoginInfo(
      username, password
    )

    console.log(createdUser)
      setUser(createdUser);
      setUsername('')
     setPassword('')
    } catch(exception) {
      alert('login failed!')
    }
  }


  if(user === null){
    return(
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={login}>
        käyttäjätunnus <input type="text" name='Username' value={username} onChange={event => {setUsername(event.target.value)}}/> <br />
        salasana <input type="password" name='Password' value={password} onChange={event => {setPassword(event.target.value)}}/>
        <button type="submit">kirjaudu</button>
      </form>
    </div>)
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App