import mongoose from 'mongoose';
import config from 'config';

const db = config.get("mongoURI")

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex:true,
            useFindAndModify:true,
            useUnifiedTopology :true
        })
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}

export default connectDB;
