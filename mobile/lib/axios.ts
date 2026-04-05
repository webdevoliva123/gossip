import axios from "axios"
import { useAuth } from "@clerk/expo"
import { useEffect, useState } from "react"
import { Alert } from "react-native"
const API_BASE_URL = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api`



const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

interface ApiRequest<T = unknown> {
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    query?: Record<string, string | null | undefined>
    payload?: T,
    contentType?: "application/json" | "multipart/form-data",
    headers?: Record<string, string>
}

const useApi = <T= unknown> (): {
    callApi:  (obj: ApiRequest) => Promise<T | undefined>,
    loading: boolean,
    message?: string | null,
    error?: T | null,
    resData?: T | null,
} => {
    const { getToken } = useAuth()
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string | null>(null)
    const [resData,setResData] = useState<T | null>(null)
    const [error, setError] = useState<T | null>(null)
    const [internalError, setInternalError] = useState<boolean>(false)



    useEffect(() => {
        const interceptor = api.interceptors.request.use(async (config) => {
            const token = await getToken()

            if (token) {
                config.headers = config.headers || {}
                config.headers.Authorization = `Bearer ${token}`
                console.log(`🚀 Token received from clerk added in header : ${Date.now()}`)
            }

            // 🔥 FULL URL LOG
            const fullUrl =
                (config.baseURL || "") +
                (config.url || "") +
                (config.params
                    ? `?${new URLSearchParams(config.params as any).toString()}`
                    : "")

            console.log("🌍 FULL URL:", fullUrl)

            return config
        })

        return () => {
            api.interceptors.request.eject(interceptor)
        }
    }, [getToken])

    useEffect(() => {
        if (internalError) {
            Alert.alert(
                "Server Error",
                "Something went wrong. Please try again later."
            )
            setInternalError(false)
        }
    }, [internalError])


    const callApi = async ({
        method,
        url,
        payload,
        query,
        headers,
        contentType,
    }: ApiRequest) : Promise<T | undefined>  => {
        setLoading(true)
        setInternalError(false)
        setError(null)
        setMessage(null)

        console.log(`🚀 Api Request Initiated : ${Date.now()}`)
        const apiUrl: string = !url?.startsWith("/") ? `/${url}` : url

        console.log({
            api: api.request
        });


        try {
            const res = await api({
                method,
                url: apiUrl,
                params: query,
                data: payload,
                headers: {
                    ...(headers || {}),
                    ...(contentType && { "Content-Type": contentType })
                }
            })
            console.log(`🚀 Api Called Successfully - ${apiUrl} : ${Date.now()}`)
            setMessage(res.data?.message || null)
            setError(res.data?.error || null)
            setResData(res.data?.data || null)
            return res.data?.data as T 
        } catch (err) {
            console.log({ err })
            setInternalError(true)
            console.log(`🚀 Api Failed - ${apiUrl} : ${Date.now()}`)
        }
        finally {
            setLoading(false)
            console.log(`🚀 Api Request Completed - ${apiUrl} : ${Date.now()}`)
        }
    }


    return { callApi, resData, loading, message, error }
}

export default useApi