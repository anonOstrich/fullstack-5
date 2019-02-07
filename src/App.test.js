import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {

  it('if user not logged, notes are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('kirjaudu'))
    expect(component.container).not.toHaveTextContent('Esimerkki Blogi')
  })

  it('if user logged in, notes are rendered', async () => {
    window.localStorage.setItem('loggedAppUser',
      JSON.stringify({
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      })
    )

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blogInfo')
    )
    const blogs = component.container.querySelectorAll('.blogInfo')
    expect(blogs.length).toBe(2)
    expect(component.container).toHaveTextContent('Esimerkki Blogi')
    expect(component.container).toHaveTextContent('Fantasia Blogi')

  })



})
