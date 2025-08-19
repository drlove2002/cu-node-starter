import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { initializeDatabase } from './utils/initDB.js';

dotenv.config();

// Initialize database on startup
initializeDatabase().catch(console.error);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    waitForConnections: true,
});

export default pool;