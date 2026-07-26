// All values now come from environment variables (see server/.env).
// Nothing sensitive is hardcoded here anymore.
const config = {
  production: {
    SECRET: process.env.SESSION_SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: process.env.SESSION_SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
