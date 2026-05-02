const { test, expect, beforeEach, describe } = require('@playwright/test')

const testUser1 = {
  username: 'aaaa',
  password: 'aaaa'
}

const testUser2 = {
  username: 'aaaaa',
  password: 'aaaaa'
}

const testBlog = {
  title: 'someTitle',
  author: 'someAuthor',
  url: 'http://someurl.com'
}

const rankTestBlogs = [
  {
    title: 'most liked blog',
    author: 'author one',
    url: 'http://mostliked.com'
  },
  {
    title: 'middle liked blog',
    author: 'author two',
    url: 'http://middleliked.com'
  },
  {
    title: 'least liked blog',
    author: 'author three',
    url: 'http://leastliked.com'
  }
]

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    await request.delete('http://localhost:3003/api/testing/reset')
    // create a user for the backend here
    await request.post('http://localhost:3003/api/users/', {
      data: {
        username: testUser1.username,
        password: testUser1.password
      }
    })
    await request.post('http://localhost:3003/api/users/', {
      data: {
        username: testUser2.username,
        password: testUser2.password
      }
    })
    await page.goto('http://localhost:5173/login')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username:')).toBeVisible()
    await expect(page.getByLabel('password:')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill(testUser1.username)
      await page.getByLabel('password').fill(testUser1.password)
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('logout')).toBeVisible
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill(testUser1.username + 'asdfasdfa')
      await page.getByLabel('password').fill(testUser1.password + 'asdfasdad')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill(testUser1.username)
      await page.getByLabel('password').fill(testUser1.password)
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('link', { name: 'new_blog' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByLabel('title:').fill(testBlog.title)
      await page.getByLabel('author:').fill(testBlog.author)
      await page.getByLabel('url:').fill(testBlog.url)
      await page.getByRole('button', {name: 'create'}).click()
      expect(page.getByText(`${testBlog.title} ${testBlog.author}`)).toBeVisible()
    })

    describe('Actions on created blogs', () => {
      beforeEach(async ({ page }) => {
        await page.getByLabel('title:').fill(testBlog.title)
        await page.getByLabel('author:').fill(testBlog.author)
        await page.getByLabel('url:').fill(testBlog.url)
        await page.getByRole('button', {name: 'create'}).click()
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('link', { name: `${testBlog.title} ${testBlog.author}` }).click()
        const likeButton = page.getByRole('button', { name: 'like' })
        expect(likeButton).toBeVisible()
        await likeButton.click()
        expect(page.getByText('likes 1')).toBeVisible()
      })

      test('a blog can be removed by the user who added it', async ({ page }) => {
        page.once('dialog', async dialog => {
          await dialog.accept();
        });
        await page.getByRole('link', { name: `${testBlog.title} ${testBlog.author}` }).click()
        await page.getByRole('button', { name: 'remove' }).click()
        const message = `${testBlog.title} by ${testBlog.author} was deleted successfully`
        console.log(message)
        expect(page.getByText(message)).toBeVisible()
      })

      test('a user who didn\'t create the blog can\'t see the remove button', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await page.getByRole('link', { name: 'login' }).click()
        await page.getByLabel('username').fill(testUser2.username)
        await page.getByLabel('password').fill(testUser2.password)
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByRole('link', { name: `${testBlog.title} ${testBlog.author}` }).click()
        expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    test('blogs are arranged by likes with the most liked first', async ({ page }) => {
      const createBlog = async (blog) => {
        await page.getByRole('link', { name: 'new_blog' }).click()
        await page.getByLabel('title:').fill(blog.title)
        await page.getByLabel('author:').fill(blog.author)
        await page.getByLabel('url:').fill(blog.url)
        await page.getByRole('button', { name: 'create' }).click()
        await page.waitForURL('http://localhost:5173/')
      }

      const likeBlog = async (blog, likeCount) => {
        await page.getByRole('link', { name: `${blog.title} ${blog.author}` }).click()
        const likeButton = page.getByRole('button', { name: 'like' })

        for (let i = 0; i < likeCount; i++) {
          await likeButton.click()
          await page.waitForTimeout(300)
        }

        await page.getByRole('link', { name: 'home' }).click()
        await page.waitForURL('http://localhost:5173/')
      }

      for (const blog of rankTestBlogs) {
        await createBlog(blog)
      }

      await likeBlog(rankTestBlogs[0], 3)
      await likeBlog(rankTestBlogs[1], 2)
      await likeBlog(rankTestBlogs[2], 1)

      const blogs = page.locator('a').filter({ hasText: new RegExp(`(${rankTestBlogs.map(b => b.title).join('|')})`) })
      await expect(blogs.nth(0)).toContainText(rankTestBlogs[0].title)
      await expect(blogs.nth(1)).toContainText(rankTestBlogs[1].title)
      await expect(blogs.nth(2)).toContainText(rankTestBlogs[2].title)
    })
  })
})