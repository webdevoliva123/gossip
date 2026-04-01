interface IApiResponse<TData = unknown, TError = unknown> {
    type: "success" | "error" | "failed";
    statusCode?: number;
    route: string;
    message: string;
    data?: TData;
    error?: TError;
}

export const RETURNRS = <TData = unknown, TError = unknown>({
    res, type, statusCode = 200, route, message, data, error
}: IApiResponse<TData, TError> & { res: any }) => {
    console.log(`[${type.toUpperCase()}] ${route} - ${message}`);
    if (error != null) {
        console.error({error});
    }
    res.status(statusCode || 200).json({
        type,
        route,
        message,
        data: data ? data : null,
        error: error ? error : null
    })
}