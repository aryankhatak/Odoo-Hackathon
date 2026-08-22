const sqlite3 = require('sqlite3'); const db = new sqlite3.Database('prisma/dev.db'); db.all('SELECT email, length(photo_url) FROM User', (err, rows) => { console.log(err, rows) });
