import React from 'react'
import { render } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'



describe('<SimpleBlog />', () => {
  const blog = {
    title: 'Blog of Tests',
    author: 'Test Writer',
    likes: 7
  }
  let component

  beforeEach(() => {
    component = render(
      <SimpleBlog blog = {blog} onClick={ () => {
        blog.likes++
      }} />
    )}
  )

  test('renders the title, author and number of likes', () => {
    const basicInfo = component.container.querySelector('.basicBlogInfo')
    expect(basicInfo).toHaveTextContent(`${blog.title} ${blog.author}`)

    const likeInfo = component.container.querySelector('.likesBlogInfo')
    expect(likeInfo).toHaveTextContent(`blog has ${blog.likes} likes`)
  })

})