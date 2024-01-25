import mongoose from 'mongoose';

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    try {
        const mongodbUrl = process.env.MONGODB_URL || ''; // Set a default value if process.env.MONGODB_URL is undefined
        await mongoose.connect(mongodbUrl);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}
