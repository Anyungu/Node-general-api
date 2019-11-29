
import mongoose from 'mongoose';


mongoose.PromiseProvider = global.Promise;

export const dbConnect = () => mongoose.connect('mongodb://localhost/music', {useNewUrlParser: true});