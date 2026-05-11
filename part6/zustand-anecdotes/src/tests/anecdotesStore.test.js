import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('../service/service', () => ({
  default: {
    getAll: vi.fn(),
    add: vi.fn(),
    update: vi.fn(),
    del: vi.fn()
  }
}))

import anecdoteService from '../service/service'
import { useAnecdoteStore, useAnecdoteActions, useAnecdotes } from '../store/anecdotesStore'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('anecdoteStore', () => {
  it('initialized from the backend', async () => {
    const mockAnecdotes = [{id: 1, content: "Test", votes: 69}]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })
    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual(mockAnecdotes)
  })

  it('anecdotes sorted by votes', async () => {
    const mockAnecdotes = [
      {id: 1, content: "Test1", votes: 67},
      {id: 2, content: "Test2", votes: 69}
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
    const sortedMockAnecdotes = mockAnecdotes.toSorted((a, b) => (b.votes - a.votes))
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })
    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual(sortedMockAnecdotes)
  })

  it('anecdotes filter works', async () => {
    const mockFilter = '1'
    const mockAnecdotes = [
      {id: 1, content: "Test1", votes: 67},
      {id: 2, content: "Test2", votes: 69}
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
    const filteredMockAnecdotes = mockAnecdotes.filter(
      anecdote => (anecdote.content.includes(mockFilter)
    ))
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
      result.current.setFilter(mockFilter)
    })
    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual(filteredMockAnecdotes)
  })

  it('anecdotes votes work', async () => {
    const mockAnecdotes = [{id: 1, content: "Test1", votes: 67}]
    const votedMockAnecdotes =  [{...mockAnecdotes[0], votes: mockAnecdotes[0].votes + 1}]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
      result.current.vote(mockAnecdotes[0].id)
    })
    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual(votedMockAnecdotes)
  })
})