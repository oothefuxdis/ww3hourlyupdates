const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const newEntry = JSON.parse(event.body);
  const archivePath = path.resolve(__dirname, '../../archive.json');

  try {
    const fileData = fs.readFileSync(archivePath, 'utf8');
    const archive = JSON.parse(fileData);

    archive.push(newEntry);

    fs.writeFileSync(archivePath, JSON.stringify(archive, null, 2));

    return {
      statusCode: 200,
      body: '✅ Headline saved to archive.json successfully.',
    };
  } catch (error) {
    console.error('❌ Failed to update archive:', error);
    return {
      statusCode: 500,
      body: '⚠️ Failed to save headline. See logs.',
    };
  }
};

