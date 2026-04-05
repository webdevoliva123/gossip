import { API_AUTH_CALLBACK } from "@/constant/apis.list"
import useApi from "@/lib/axios"
import { useAuth, useUser } from "@clerk/expo"
import { useEffect, useRef } from "react"

const AuthSync = () => {
    const { isSignedIn } = useAuth()
    const { user } = useUser()
    const hasSynced = useRef(false)
    const { callApi } = useApi()

    const runCallback = async () => {
       try {
         await callApi({
            method: "POST",
            url: API_AUTH_CALLBACK,
        })
       } catch (error) {
         console.log("Auth sync failed:", error)
       }
    }

    useEffect(() => {
        if (isSignedIn && user && !hasSynced.current) {
            hasSynced.current = true
            runCallback()
        }

        if (!isSignedIn) {
            hasSynced.current = false
        }
    }, [isSignedIn, user])

    return null
}

export default AuthSync