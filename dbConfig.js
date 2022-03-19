const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

module.exports = dbConfig;
//postgres://{user}:{password}@{hostname}:{port}/{database-name}