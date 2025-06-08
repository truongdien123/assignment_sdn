import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URL as string);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch(error) {
        process.exit(1);
    }
}