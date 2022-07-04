import { MongoClient } from "mongodb";
const MONGODB_URL = process.env.MONGODB_URL || "";

let cachedDb: MongoClient;

export async function getDatabase(): Promise<MongoClient> {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  const db = await MongoClient.connect(MONGODB_URL);
  cachedDb = db;
  return cachedDb;
}
