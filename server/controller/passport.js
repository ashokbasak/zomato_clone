const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;

const passport = require("passport");

const GOOGLE_CLIENT_ID = "150219977223-kdjgmh4o2lkrll9cgc9ns82k3lkdigbv.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "60c4a7865e6d44235567";
GITHUB_CLIENT_SECRET = "b3135b9fa9a97c39910f502ccea3b573296e0f0d";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});