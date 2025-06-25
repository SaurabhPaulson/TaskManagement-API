const db = require('../db/pgp');
const bcrypt = require('bcrypt');

exports.createUser = async ({ username, password, role }) => {
    const hash = await bcrypt.hash(password, 10);
    const user = await db.one(
        `INSERT INTO users (username, password, role, created_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING id, username, role`,
        [username, hash, role]
    );
    return user;
};

exports.findByUsername = async (username) => {
    return db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
};
