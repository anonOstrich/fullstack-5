import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { prettyDom, getAllByTestId } from 'dom-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    username: 'XXXtesterXXX',
    name: 'Master Tester'
  }
  const blog = {
    title: 'Blog of Tests',
    author: 'Test Writer',
    url: 'testpage.fi',
    likes: 7,
    user: user
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} handleLike={() => {}} />
    )
  })

  test('renders content', () => {
    const div = component.getByText(`${blog.title} ${blog.author}`)
    expect(div).toBeDefined()
  })

  test('displays author and title by default', () => {
    const basicDiv = component.container.querySelector('.blogInfo')
    expect(basicDiv).not.toHaveStyle('display: none')
    expect(basicDiv).toHaveTextContent(`${blog.title} ${blog.author}`)
  })

  test('does not display all information by default', () => {
    const hiddenDiv = component.container.querySelector('.extraInfo')
    expect(hiddenDiv).toHaveStyle('display: none')
  })

  test('displays all information after clicking button', () => {
    const clickableInfo = component.container.querySelector('.blogInfo')
    fireEvent.click(clickableInfo)
    const extraInfo = component.container.querySelector('.extraInfo')
    expect(extraInfo).not.toHaveStyle('display: none')
  })

})