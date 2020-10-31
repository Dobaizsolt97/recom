import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(
      `MongoDb Connected: ${connection.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.error(`Ereor : ${error.message}`.red.underline);
    process.exit(1);
  }
};

export default connectDB;
