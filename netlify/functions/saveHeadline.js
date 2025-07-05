const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const newEntry = JSON.parse(event.body);
  const filePath = path.join(__dirname, '..', '..', 'archive.json');

  try {
    let archive = [];

    if (fs.existsSync(filePath)) {
      const existing = fs.readFileSync(filePath, 'utf8');
      archive = JSON.parse(existing);
    }

    archive.unshift(newEntry); // Add new item to top
    fs.writeFileSync(filePath, JSON.stringify(archive, null, 2));

    return {
      statusCode: 200,
      body: '✅ Headline saved to archive.json'
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: '❌ Failed to save headline'
    };
  }
};
