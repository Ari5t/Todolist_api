const passport = require('passport');
const jwt = require('jsonwebtoken');

const pasingup = passport.authenticate('signup', { session: false });

const singup = async (req, res, next) => {
        res.json({
        message: 'Signup successful',
        user: req.user
      });
};

const login = async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, username: user.text };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
};

module.exports = {
    pasingup,
    singup,
    login
};