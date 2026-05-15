import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import anecdotesService from "../services/anecdotesService"
import { useNotif } from "./useNotif"

export const useAnecdote = () => {
  const queryClient = useQueryClient()
  const { notify } = useNotif()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    refetchOnWindowFocus: false,
    retry: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.addNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => { notify(error.message) }
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => { newAnecdoteMutation.mutate({ content, votes: 0}) },
    voteAnecdote: (anecdote) => {
      voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }
  }
}