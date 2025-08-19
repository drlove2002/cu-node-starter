import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function initializeDatabase() {
    let connection;
    try {
        // First, connect without specifying a database
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        console.log('🔌 Connected to MySQL server');

        // Check if database exists
        const [rows] = await connection.execute(
            `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
            [process.env.DB_NAME]
        );

        const databaseExists = Array.isArray(rows) && rows.length > 0;

        if (!databaseExists) {
            // Database doesn't exist, create it
            console.log(`📦 Creating database: ${process.env.DB_NAME}`);
            await connection.execute(`CREATE DATABASE ${process.env.DB_NAME}`);
            console.log('✅ Database created successfully');
        } else {
            console.log(`✅ Database already exists: ${process.env.DB_NAME}`);
        }

        await connection.end();

        // Now connect to the specific database to create tables
        const dbConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // Create submissions table
        console.log('📊 Creating submissions table...');
        await dbConnection.execute(`
            CREATE TABLE IF NOT EXISTS submissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                dob DATE NOT NULL,
                date_from DATE NULL,
                date_to DATE NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Submissions table ready');

        await dbConnection.end();

    } catch (error: any) {
        console.error('❌ Failed to initialize database:', error.message);
        if (connection) {
            await connection.end();
        }
        throw error;
    }
}

export { initializeDatabase };