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

  // if login information in local storage, log the user in
  useEffect(() => {
    const jsonUser = window.localStorage.getItem('loggedAppUser')
    if(jsonUser){
      setUser(JSON.parse(jsonUser))
    }
  }, [])

  const login = async (event) => {
    event.preventDefault()
    try{

    const createdUser = await loginService.sendLoginInfo(
      username, password
    )

      setUser(createdUser);
      window.localStorage.setItem('loggedAppUser', JSON.stringify(createdUser))
      setUsername('')
      setPassword('')
    } catch(exception) {
      alert('login failed!')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
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
      <div>
        <p>{user.name} logged in</p>
        <button onClick={logout}>logout</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App