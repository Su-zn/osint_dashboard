import app from './app.js';
import { PORT } from './config/env.js';
import pool from './config/db.js';


async function startServer() {
    try {
        const client = await pool.connect();
        console.log('Connected to the database');
        client.release();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
}

startServer();