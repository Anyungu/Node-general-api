
import jwt from 'jsonwebtoken';
import {secretKey} from '../../config/secret'


export default {

    issueToken(payload, expiresIn) {
        return jwt.sign(payload, secretKey.secret, {expiresIn})
    }

}