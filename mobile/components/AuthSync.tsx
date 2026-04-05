import useAuthCallBack from "@/hooks/useAuthCallback"
import { useAuth, useUser } from "@clerk/expo"
import { useEffect, useRef } from "react"

const AuthSync = () => {
    const { isSignedIn } = useAuth()
    const { user } = useUser()
    const hasSynced = useRef(false)
    const {runCallback} = useAuthCallBack()


    useEffect(() => {
        if (isSignedIn && user && !hasSynced.current) {
            hasSynced.current = true
            runCallback()
        }

        if (!isSignedIn) {
            hasSynced.current = false
        }
    }, [isSignedIn, user, runCallback])

    return null
}

export default AuthSync