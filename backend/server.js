import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';   // Use import to load the routes
import cors from 'cors';
import { dbConnect } from './utiles/db.js';


dotenv.config(); // This loads the environment variables

const app = express();

app.use(cors({
    origin : ['http://localhost:3000'],
    credentials : true
}))


app.use(express.json());

 

app.use('/api', authRoutes); // Assuming authRoutes exports a default

app.get('/', (_req, res) => res.send('My backend'));

const port = process.env.PORT || 5000; // Set a default port if not defined
dbConnect();
app.listen(port, () => console.log(`Server is running on port ${port}`));
