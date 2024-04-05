const fs = require('fs');
const http = require('http');
const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb://localhost:27017'; // MongoDB URI
const dbName = 'admin';

const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

const server = http.createServer();

server.on('request', async (req, res) => {
  // Add CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  let requestData = '';

  req.on('data', (chunk) => {
    requestData += chunk;
  });

  req.on('end', async () => {
    if (requestData.length < 1) {
      res.end('Null string');
      return;
    }

    try {
      const database = client.db(dbName);
      const collection = database.collection('tickets');

      const formData = JSON.parse(requestData);
      await collection.insertOne(formData);

      res.statusCode = 200;
      res.end('Form data added to database');
    } catch (error) {
      console.error('Error adding form data to database:', error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
