import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
// import { useRouter } from 'next/navigation' // Para App Router

export const useURLParams = () => {

    const router = useRouter()
    
    const updateParams = useCallback((params: Record<string, string | null>) => {
        const url = new URL(window.location.href)
        
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value)
            } else {
                url.searchParams.delete(key)
            }
        })
        
        router.push(url.pathname + url.search,{
            scroll: false
        })
    }, [])
    
    const getParam = useCallback((key: string): string | null => {
        const url = new URL(window.location.href)
        return url.searchParams.get(key)
    }, [])
    
    const getAllParams = useCallback((): Record<string, string> => {
        const params: Record<string, string> = {}
        const url = new URL(window.location.href)
        Object.entries(url.searchParams).forEach(([key, value]) => {
            if (typeof value === 'string') {
                params[key] = value
            } else if (Array.isArray(value) && value[0]) {
                params[key] = value[0]
            }
        })
        return params
    }, [])
    
    return { updateParams, getParam, getAllParams }
}