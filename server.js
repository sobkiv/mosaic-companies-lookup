const express = require('express');
const path = require('path');
const cors = require('cors');  // Import cors
const app = express();
const port = 3001;

app.use(cors());

app.get('/companies', (req, res) => {
  const filePath = path.join(__dirname, 'companies-lookup.json');

  const fs = require('fs');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }

    try {
      const companies = JSON.parse(data);
      res.json(companies);
    } catch (parseErr) {
      res.status(500).send('Error parsing JSON');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
