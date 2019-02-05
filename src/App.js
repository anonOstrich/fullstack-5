import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


//noteform as a component of its own
const NoteForm = ({updateShownBlogs}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const createBlog = async event => {
    event.preventDefault()
    try{
      const result = await blogService.create({title, author, url})
      setTitle('')
      setAuthor('')
      setUrl('')
      updateShownBlogs(result)
    } catch(exception){
      alert('jotain meni blogin luonnissa vikaan :(')
    }

  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        title <input value={title} name='Title' onChange={event => {setTitle(event.target.value)}}/><br />
        author <input value={author} name='Value' onChange={event => {setAuthor(event.target.value)}}/><br />
        url <input value={url} name='Url' onChange={event => {setUrl(event.target.value)}}/><br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

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
      const loggedUser = JSON.parse(jsonUser)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
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
      blogService.setToken(createdUser.token)
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
        käyttäjätunnus <input type="text"  value={username} onChange={event => {setUsername(event.target.value)}}/> <br />
        salasana <input type="password"  value={password} onChange={event => {setPassword(event.target.value)}}/>
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
      <NoteForm  updateShownBlogs={
        newBlog => {setBlogs(blogs.concat(newBlog))}
      }/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App