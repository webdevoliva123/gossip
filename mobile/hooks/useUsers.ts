import { API_USERS_LISTING } from "@/constant/apis.list"
import useApi from "@/lib/axios"
import { UserDType } from "@/types"
import { useCallback, useEffect } from "react"

export const useUsers = () => {

    const { callApi, resData, loading, error, message } = useApi<UserDType[]>()

    const runUsersListing = useCallback(async () => {
        try {
            await callApi({
                method: "GET",
                url: API_USERS_LISTING
            })
        } catch (error) {
            console.log("Failed to call chat listing", error)
        }
    }, [])


    useEffect(() => {
        runUsersListing()
    }, [runUsersListing])

    return { resData, loading, error, message }
}

