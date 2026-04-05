import { API_AUTH_CALLBACK } from "@/constant/apis.list"
import useApi from "@/lib/axios"

const useAuthCallBack = () => {
    const { callApi} = useApi()
    
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

    return { runCallback }
}


export default useAuthCallBack