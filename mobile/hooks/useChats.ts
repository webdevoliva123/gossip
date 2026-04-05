import { API_CHATS_GET_OR_CREATE_CHAT, API_CHATS_LISTING } from "@/constant/apis.list"
import useApi from "@/lib/axios"
import { ChatDType } from "@/types"
import { useCallback, useEffect, useState } from "react"


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

    return { resData, loading, error, message, refetch: runChatsListing }
}

export const useGetOrCreateChat = () => {
    const { callApi, loading, error, message } = useApi()

    const getOrCreateChatAction = async ({
        participantId,
        onSuccess,
        onError,
    }: {
        participantId: string,
        onSuccess?: (chat: ChatDType) => void
        onError?: () => void
    }) => {
        try {
            let res = await callApi({
                method: "POST",
                url: API_CHATS_GET_OR_CREATE_CHAT(participantId),
            })

            onSuccess?.(res as ChatDType)
        } catch (err) {
            console.log(err)
            onError?.()
        }
    }



    return { getOrCreateChatAction, loading, error, message }
}