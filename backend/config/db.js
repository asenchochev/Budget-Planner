import mongoose from "mongoose";

/**
 * Свързва се с MongoDB, използвайки MONGO_URI от env.
 * При грешка спира процеса – няма смисъл API да работи без база.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB свързана: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Грешка при свързване с MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
