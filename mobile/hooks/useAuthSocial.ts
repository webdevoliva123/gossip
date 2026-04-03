import { useSSO } from "@clerk/expo";
import { useState } from "react";

const useAuthSocial = () => {
    const [loadingStrategy, setLoadingStrategy] = useState<"oauth_google" | "oauth_apple" | null>(null);
    const [errorStrategy, setErrorStrategy] = useState<{
        strategy: "oauth_google" | "oauth_apple",
        message: string
    } | null>(null);
    const { startSSOFlow } = useSSO();

    const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
        setLoadingStrategy(strategy);
        setErrorStrategy(null)
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy });


            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId });
            } else {
                setErrorStrategy({
                    strategy,
                    message: "Failed to authenticate with the selected provider. Please try again."
                });
                setLoadingStrategy(null);
            }
        } catch (error) {
            console.log({ error });

            setErrorStrategy({
                strategy,
                message: "An error occurred during social authentication. Please try again."
            });

        } finally {
            setLoadingStrategy(null);
        }


    }

    return { handleSocialAuth, loadingStrategy, errorStrategy }
}


export default useAuthSocial