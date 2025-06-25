const db = require('../db/pgp');

// Create a new task
exports.createTask = async (taskData) => {
    const { title, description, status = 'pending', assignedUser = null } = taskData;
    const result = await db.one(
        `INSERT INTO tasks (title, description, status, assigned_user, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         RETURNING *`,
        [title, description, status, assignedUser]
    );
    return result;
};

// Get all tasks
exports.getTasks = async () => {
    return db.any('SELECT * FROM tasks ORDER BY created_at DESC');
};

// Update a task by ID
exports.updateTask = async (id, updateData) => {
    const { title, description, status, assignedUser } = updateData;
    const result = await db.oneOrNone(
        `UPDATE tasks SET
            title = COALESCE($2, title),
            description = COALESCE($3, description),
            status = COALESCE($4, status),
            assigned_user = COALESCE($5, assigned_user),
            updated_at = NOW()
         WHERE id = $1
         RETURNING *`,
        [id, title, description, status, assignedUser]
    );
    return result;
};

// Delete a task by ID
exports.deleteTask = async (id) => {
    const result = await db.result('DELETE FROM tasks WHERE id = $1', [id]);
    return result.rowCount > 0;
};

// Create the tasks table if it doesn't exist
db.none(`
    CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        assigned_user INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`)
    .then(() => {
        console.log('Tasks table is ready.');
    })
    .catch((error) => {
        console.error('Error creating tasks table:', error);
    });

// Optionally, if you want to link assigned_user to users table:
// db.none(`
//     ALTER TABLE tasks
//     ADD CONSTRAINT fk_assigned_user
//     FOREIGN KEY (assigned_user)
//     REFERENCES users(id)
// `)
//     .then(() => {
//         console.log('Foreign key constraint added for assigned_user.');
//     })
//     .catch((error) => {
//         console.error('Error adding foreign key constraint:', error);
//     });