
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;


const songSchema = new Schema({

    title: {
        type: String,
        required: [true, 'Song Must have a title']
    },
    url: {
        type: String,
        required: [true, 'Song Must have a url']
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
});

songSchema.plugin(mongoosePaginate);

export default mongoose.model('Song', songSchema);