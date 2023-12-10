exports.serverConfig = {
  databaseUri:
    process.env.DATABASE_URI ||
    "mongodb+srv://admin:zawwxC4XlT7gzx7d@cluster0.v4hgi.mongodb.net/autoprojectDevelopment?retryWrites=true&w=majority",
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:5000",
  port: process.env.PORT || 5000,
  secret: "avenge-sanautos-secret-key"
};