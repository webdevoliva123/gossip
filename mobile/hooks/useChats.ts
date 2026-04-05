import { API_CHATS_LISTING } from "@/constant/apis.list"
import useApi from "@/lib/axios"
import { ChatDType } from "@/types"
import { useCallback, useEffect } from "react"


export const useChats = () => {

    const { callApi, resData, loading, error, message } = useApi<ChatDType[]>()

    const runChatsListing = useCallback(async () => {
        try {
            await callApi({
                method: "GET",
                url: API_CHATS_LISTING
            })
        } catch (error) {
            console.log("Failed to call chat listing", error)
        }
    }, [])


    useEffect(() => {
        runChatsListing()
    }, [runChatsListing])

    return { resData, loading, error, message }
}