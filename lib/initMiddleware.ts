import Cors from 'cors';

function initMiddleware(middleware) {
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
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
