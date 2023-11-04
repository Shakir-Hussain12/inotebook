//MySQL without ORM
try {
    const [rows] = await pool.execute('SELECT * FROM user');
    res.json(rows);
} catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
}

//MySQL with ORM
try {
    const users = await User.findAll();
    // const users = await User.findByPk(1);
    res.json(users);
} catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).send('Error retrieving users');
}

// postgres
try {
    // let id = req.body.id;
    const users = await db.query(`SELECT * FROM users where id = 6`);
    if(users.rowCount() > 0) {
        res.json(users.rows);
    } else {
        res.json({ response: "Fill data for previous semester first" });
    }
    
    // let name = req.body.name;
    // let email = req.body.email;
    // let password = req.body.password;

    // const confirm = await db.query(`INSERT into users values(5, '${name}', '${email}', ${password});`); 
    // res.json(confirm);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}