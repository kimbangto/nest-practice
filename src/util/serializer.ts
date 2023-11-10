import passport from 'passport';

export const serializeUser = () =>
  passport.serializeUser((user, done) => {
    console.log('serializeUser', user);
    done(null, user);
  });
export const deserializeUser = () =>
  passport.deserializeUser((user, done) => {
    console.log('deserializeUser', user);
    done(null, user);
  });
