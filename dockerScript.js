const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'companies-lookup.json');
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const companies = JSON.parse(data);
  console.log('Companies:', companies);
});
