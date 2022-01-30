module.exports = {
  reactStrictMode: true,
  env: {
    mongodburl: `mongodb+srv://mongo_user_db:${process.env.MONGO_DB_PASS}@cluster0.chybs.mongodb.net/cloudFramework?retryWrites=true&w=majority`
  }
}
