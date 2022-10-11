import mongoose from 'mongoose';

async function connectMongo() {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
  return conn;
}

export { connectMongo };