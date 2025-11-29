const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '..', '..', 'db.json');

exports.handler = async function(event, context) {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const db = JSON.parse(raw || '{}');
    let admins = db.admins || [];

    const q = event.queryStringParameters || {};
    if (q.email) {
      admins = admins.filter(a => String(a.email).toLowerCase() === String(q.email).toLowerCase());
    }
    if (q.password) {
      admins = admins.filter(a => String(a.password) === String(q.password));
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admins)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read DB', details: err.message })
    };
  }
};
