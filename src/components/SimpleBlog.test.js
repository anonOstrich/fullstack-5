import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'



describe('<SimpleBlog />', () => {
  const blog = {
    title: 'Blog of Tests',
    author: 'Test Writer',
    likes: 7
  }

  test('renders the title, author and number of likes', () => {
    const component = render(
      <SimpleBlog blog = {blog} />
    )

    const basicInfo = component.container.querySelector('.basicBlogInfo')
    expect(basicInfo).toHaveTextContent(`${blog.title} ${blog.author}`)

    const likeInfo = component.container.querySelector('.likesBlogInfo')
    expect(likeInfo).toHaveTextContent(`blog has ${blog.likes} likes`)
  })


  test('calls the like increment function when button is clicked', () => {
    const mockHandler = jest.fn()

    const component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })

})