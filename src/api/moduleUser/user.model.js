

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;


const userSchema = new Schema({

    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstName: {
        type: String,
        required: [true, 'firstName is required']
    },
    lastName : {
        type: String,
        required: [true, 'lastName is required']
    },
});

userSchema.plugin(mongoosePaginate);

export default mongoose.model('User', userSchema);