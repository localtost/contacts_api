import express, { request } from 'express';
import users from './routes/users';
import auth from './routes/auth';
import contacts from './routes/contacts';
import connectDB from "./config/db";

const server = express();

server.use('/api/auth',auth);
server.use('/api/contacts',contacts);
server.use('/api/users',users);


const PORT = process.env.PORT || 5000;

connectDB().then(()=>console.log('Db is connected'));
server.listen(PORT,()=>console.log(`Server start om server on port ${PORT}`))
