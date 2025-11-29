const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '..', '..', 'db.json');

exports.handler = async function(event, context) {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const db = JSON.parse(raw || '{}');
    let students = db.students || [];

    // support query params ?email=...&password=...
    const q = event.queryStringParameters || {};
    if (q.email) {
      students = students.filter(s => String(s.email).toLowerCase() === String(q.email).toLowerCase());
    }
    if (q.password) {
      students = students.filter(s => String(s.password) === String(q.password));
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(students)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read DB', details: err.message })
    };
  }
};
