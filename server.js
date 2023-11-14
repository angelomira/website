const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    // Add CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    let requestData = '';

  req.on('data', (chunk) => {
    requestData += chunk;
  });

  if(requestData.length < 1) {
    res.end('Null string');
  }

  fs.readFile('database.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end('Internal Server Error');
      return;
    }
    const database = JSON.parse(data);
    console.log(`- ${requestData}`);
    database.push(requestData);
    fs.writeFile('database.json', JSON.stringify(database), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      res.statusCode = 200;
      res.end('Form data added to database');
    });
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
