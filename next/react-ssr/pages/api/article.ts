import { NextApiRequest, NextApiResponse } from "next";
import { ArticleModel, connectMongo } from "../../models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.statusCode = 200;
    await connectMongo()
    if (req.method == "GET") {
        try {
            const { query } = req;
            if (query && query.id) {
                const article = await ArticleModel.findById(query.id)
                res.json({
                    code: 0,
                    data: article
                })
            } else {
                const articles = await ArticleModel.find()
                res.json({
                    code: 0,
                    data: articles
                })
            }
        } catch (error) {
            res.json({
                code: 1,
                error
            })
        }
    } else if (req.method === "POST") {
        try {
            const articles = await ArticleModel.create(JSON.parse(req.body))
            res.json({
                code: 0,
                msg: 'success'
            })
        } catch (error) {
            res.json({
                code: 1,
                error
            })
        }
    } else if (req.method === "PUT") {
        try {
            const params = JSON.parse(req.body)
            const articles = await ArticleModel.findByIdAndUpdate(params._id, params)
            res.json({
                code: 0,
                msg: 'success'
            })
        } catch (error) {
            res.json({
                code: 1,
                error
            })
        }
    } else if (req.method === "DELETE") {
        try {
            const articles = await ArticleModel.findOneAndDelete(req.body._id)
            res.json({
                code: 0,
                msg: 'success'
            })
        } catch (error) {
            res.json({
                code: 1,
                error
            })
        }
    }
}