import {NextApiRequest} from "next";

export interface IMessageNextApiRequest extends NextApiRequest {
    query: { 
        message?: string; 
    }
}