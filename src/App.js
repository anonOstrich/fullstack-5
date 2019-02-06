import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'


//noteform as a component of its own
const NoteForm = ({ updateShownBlogs, updateNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const createBlog = async event => {
    event.preventDefault()
    try{
      const result = await blogService.create({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      updateShownBlogs(result)
      console.log('Created blog', result)
      updateNotification(`a new blog ${result.title} by ${result.author} added`)
    } catch(exception){
      updateNotification('an error occured in creating the blog', true)
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


const NotificationMessage = ({ message, isError }) => {

  const notificationStyle = {
    color:isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5
  }

  return (
    <div style={notificationStyle}>
      <p>{message}</p>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)


  const sortBlogs = (toBeSorted) =>  toBeSorted.slice().sort((blogA, blogB) => blogB.likes - blogA.likes)


  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sorted_blogs = sortBlogs(blogs)
      return setBlogs( sorted_blogs )
    }
    )
  }, [])

  // if login information in local storage, log the user in
  useEffect(() => {
    const jsonUser = window.localStorage.getItem('loggedAppUser')
    if(jsonUser){
      const loggedUser = JSON.parse(jsonUser)
      setUser(loggedUser)
      console.log('Here comes!',loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const login = async (event) => {
    event.preventDefault()
    try{
      const createdUser = await loginService.sendLoginInfo(
        username, password
      )

      setUser(createdUser)
      window.localStorage.setItem('loggedAppUser', JSON.stringify(createdUser))
      blogService.setToken(createdUser.token)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setNotification('wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const blogRemover = (blog) => async () => {
    if(!window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      return
    }

    const response = await blogService.removeBlog(blog)
    if(Number(response.status) > 200 && Number(response.status) < 300){
      console.log('Successfully deleted!')
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }


  const blogLiker = (blog) => async () => {


    const updatedBlog = await blogService.updateBlog({
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })


    const sortedBlogs = sortBlogs(blogs.map(b => {
      return b.id === updatedBlog.id ?
        updatedBlog :
        b
    }))
    setBlogs(sortedBlogs)
  }




  if(!user){
    return(
      <div>
        <h2>Log in to application</h2>
        {notification && <NotificationMessage message={notification} isError={error}/>}
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
      {notification && <NotificationMessage message={notification} isError={error}/>}
      <div>
        <p>{user.name} logged in</p>
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="lisää blogi">
        <NoteForm  updateShownBlogs={
          newBlog => {
            newBlog.user = user
            setBlogs(blogs.concat(newBlog))
          }
        }
        updateNotification={(message, isError) => {
          setNotification(message)
          setError(isError)
          setTimeout(() => {setNotification(null)}, 3000)
        }}
        />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          handleLike={blogLiker(blog)}
          handleRemove={
            blogRemover(blog)
          }
          currentUser = {user}

        />
      )}
    </div>
  )


}

export default App