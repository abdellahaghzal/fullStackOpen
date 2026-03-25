import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const Username = 'Username'
const Title = 'Title'
const Author = 'Author'
const URL = 'URL'
const Likes = 69

const blog = {
  user: {
    username: Username
  },
  title: Title,
  author: Author,
  url: URL,
  likes: Likes
}

test('render shrinked blog', () => {
  render(<Blog blog={blog} handleLike={() => {}} />)

  const title = screen.queryByText(Title)
  const author = screen.queryByText(Author)
  const url = screen.queryByText(URL)
  const likes = screen.queryByText(Likes)

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('render expanded blog', async () => {
  render(<Blog blog={blog} handleLike={() => {}} />)

  const user = userEvent.setup()
  const toggleButton = screen.getByText('view')
  await user.click(toggleButton)

  const url = screen.queryByText(URL)
  const likes = screen.queryByText(Likes)

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('test like button', async () => {
  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const toggleButton = screen.getByText('view')
  await user.click(toggleButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})