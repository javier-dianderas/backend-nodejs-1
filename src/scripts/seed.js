import { connectDB, disconnectDB } from "../config/db.config.js";
import { seedDatabase } from "../config/seed.js";

const force = process.argv.includes("--force");

await connectDB();
await seedDatabase({ force, fromCli: true });
await disconnectDB();