
import Passport from 'passport';
import PassportJWT from 'passport-jwt';
import { secretKey } from '../../config/secret';
import User from '../moduleUser/user.model';


export const configJWTStrategy = () => {

    const opts = {
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secretKey.secret
    }

    Passport.use(new PassportJWT.Strategy(opts, (payload, done) => {

        User.findOne({ email: payload.email }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, user);
            }

            return done(null, false)
        });
    }));
}