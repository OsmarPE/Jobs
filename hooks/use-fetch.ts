'use client'

import { useState, useEffect, useCallback } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseFetchOptions {
  immediate?: boolean
  headers?: Record<string, string>
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
}

interface UseFetchReturn<T> extends FetchState<T> {
  refetch: () => Promise<void>
  reset: () => void
}

export function useFetch<T = any>(
  url: string | null,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const { 
    immediate = true, 
    headers = {}, 
    method = 'GET',
    body 
  } = options

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const fetchData = useCallback(async () => {
    if (!url) return

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const config: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      }

      if (body && method !== 'GET') {
        config.body = JSON.stringify(body)
      }

      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      
      setState({
        data: result,
        loading: false,
        error: null
      })
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Error desconocido'
      })
    }
  }, [url, method, headers, body])

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null
    })
  }, [])

  useEffect(() => {
    if (immediate && url) {
      fetchData()
    }
  }, [fetchData, immediate, url])

  return {
    ...state,
    refetch: fetchData,
    reset
  }
}
