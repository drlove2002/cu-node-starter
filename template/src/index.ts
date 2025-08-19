import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import sampleRoutes from './routes/sample';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', sampleRoutes);

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📖 Open http://localhost:${port} in your browser`);
});