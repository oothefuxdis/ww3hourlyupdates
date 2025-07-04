export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const fs = require('fs');
    const path = require('path');

    const archivePath = path.resolve(__dirname, '../../archive.json');
    const body = JSON.parse(req.body);

    let current = [];

    if (fs.existsSync(archivePath)) {
      const file = fs.readFileSync(archivePath, 'utf-8');
      current = JSON.parse(file);
    }

    current.unshift(body); // Newest first
    fs.writeFileSync(archivePath, JSON.stringify(current, null, 2));

    res.status(200).json({ message: 'Saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal error' });
  }
};
