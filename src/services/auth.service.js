import User from '../models/user.model';
import jsonwebtoken from 'jsonwebtoken';
import { PRIV_KEY } from '../config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import passport from 'passport';

/**
 * Issue JWT
 * @param user
 * @returns {Promise<Document<any>>}
 */
const issueJWT = (user) => {
  const _id = user._id;
  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
  });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
};

/**
 * Init JWT Strategy
 * @type {{jwtFromRequest, secretOrKey: (string|string)}}
 */

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PRIV_KEY,
};

passport.use(
  new Strategy(options, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

export default {
  issueJWT,
};
