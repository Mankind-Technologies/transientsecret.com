import Cors from 'cors';
import {NextApiRequest, NextApiResponse} from "next";

function initMiddleware(middleware:any) {
    return (req: NextApiRequest, res: NextApiResponse<any>) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result:any) => {
                if (result instanceof Error) {
                    return reject(result)
                }
                return resolve(result)
            })
        })
}
export const cors = initMiddleware(Cors({
    origin: process.env.CORS_DOMAIN,
    methods: ['GET','POST','OPTIONS'],
}))
