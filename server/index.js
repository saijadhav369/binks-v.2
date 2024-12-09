require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 5000;

// Set up Sequelize with NeonDB
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging
  dialectOptions: {
    ssl: {
      require: true, // NeonDB requires SSL connections
      rejectUnauthorized: false, // For self-signed certificates
    },
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log('Connected to NeonDB successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Binks Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
