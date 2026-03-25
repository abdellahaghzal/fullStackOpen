import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

const Title = 'Title'
const Author = 'Author'
const URL = 'URL'

test('test form input values', async () => {
  const mockHandler = vi.fn()

  render(<CreateBlogForm handleSubmit={mockHandler} />)

  const user = userEvent.setup()
  const titleField = screen.getByLabelText('title')
  const authorField = screen.getByLabelText('author')
  const urlField = screen.getByLabelText('url')
  const createButton = screen.getByText('create')
  await user.type(titleField, Title)
  await user.type(authorField, Author)
  await user.type(urlField, URL)
  await user.click(createButton)

  const sentForm = mockHandler.mock.calls[0][0]
  expect(sentForm.title).toBe(Title)
  expect(sentForm.author).toBe(Author)
  expect(sentForm.url).toBe(URL)
})