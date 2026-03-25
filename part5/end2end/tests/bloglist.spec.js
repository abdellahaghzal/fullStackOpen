const { test, expect, beforeEach, describe } = require('@playwright/test')

const testUser = {
  username: 'aaaa',
  password: 'aaaa'
}

const testBlog = {
  title: 'someTitle',
  author: 'someAuthor',
  url: 'http://someurl.com'
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    await request.delete('http://localhost:3003/api/testing/reset')
    // create a user for the backend here
    await request.post('http://localhost:3003/api/users/', {
      data: {
        username: testUser.username,
        password: testUser.password
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByLabel('username:')).toBeVisible()
    await expect(page.getByLabel('password:')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill(testUser.username)
      await page.getByLabel('password').fill(testUser.password)
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText(`${testUser.username} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill(testUser.username + 'asdfasdfa')
      await page.getByLabel('password').fill(testUser.password + 'asdfasdad')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill(testUser.username)
      await page.getByLabel('password').fill(testUser.password)
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog'}).click()
      await page.getByLabel('title:').fill(testBlog.title)
      await page.getByLabel('author:').fill(testBlog.author)
      await page.getByLabel('url:').fill(testBlog.url)
      await page.getByRole('button', {name: 'create'}).click()
      expect(page.getByText(`${testBlog.title} ${testBlog.author}`)).toBeVisible()
    })
  })
})