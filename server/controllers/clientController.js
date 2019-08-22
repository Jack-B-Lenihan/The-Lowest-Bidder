const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => { 
        const {email, password} = req.body;
        const db = req.app.get('db');
        const result = await db.get_client([email]);
        const existingClient = result[0]
        if(existingClient){
            res.status(409).send('username taken');
        }
        const hash = await bcrypt.hash(password, 10);
        const registeredUser = await db.register_client(email, hash);
        const user = registeredUser[0];
        req.session.user = {
            client_email: user.client_email,
        };
        return res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        const foundUser = await db.get_client([email]);
        const user = foundUser[0];
        if(!user){
            res.status(401).send('User not found. Please register as a client before logging in.');
        }
        console.log(password)
        const isAuthenticated = await bcrypt.compareSync(password, user.password);
        console.log(isAuthenticated)
        if(!isAuthenticated){
            res.status(403).send('Incorrect password.');
        }
        req.session.user = {
            client_id: user.client_id,
            client_email: user.client_email
        }
        return res.status(200).send(req.session.user);
    },
    logout: async (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    }
}