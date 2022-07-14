module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
  useUTC: false,
  // define: {
  //   // timestamp: true,
  //   underscored: true,
  //   underscoredAll: true,
  // },
};