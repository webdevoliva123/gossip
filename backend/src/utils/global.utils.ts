import type { Response } from "express";
interface IError {
    res: Response
    type: "success" | "error" | "failed";
    statusCode?: number;
    route: string;
    message: string;
    data?: any;
    error?: any;
}
export const RETURNRS = ({
    res, type, statusCode = 200, route, message, data, error
}: IError) => {
    console.log(`[${type.toUpperCase()}] ${route} - ${message}`);
    res.status(statusCode || 200).json({
        type,
        route,
        message,
        data: data ? data : null,
        error: error ? error : null
    })
}