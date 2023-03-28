const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: "mysecretkey",
    // DATABASE: "mongodb://localhost/bloodReservior",
    DATABASE: "mongodb+srv://aleenamukhtar15:aJ2QAkVzFJ2hFLGC@cluster0.eh02z7t.mongodb.net/bloodReservior?retryWrites=true&w=majority",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
