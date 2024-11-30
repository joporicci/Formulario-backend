import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        console.log({ mongoURI });

        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
