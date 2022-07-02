import "dotenv/config";

const dbURL = process.env.MONGODB_URL || "";
console.log(dbURL);
const patate = process.env.PATATE || "";
console.log(patate);
