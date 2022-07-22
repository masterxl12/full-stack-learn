import { Schema, model, models } from 'mongoose'

const ObjectId = Schema.ObjectId;

const articleSchema = new Schema({
    id: ObjectId,
    title: String,
    name: String,
    age: Number,
    body: String,
    date: Date
});

export const ArticleModel = models.Blog || model('Blog', articleSchema);