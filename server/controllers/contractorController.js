const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        const result = await db.get_contractor([email]);
        const existingContractor = result[0];
        if(existingContractor){
            return res.status(409).json('username taken');
        }
        const hash = await bcrypt.hash(password, 10);
        const registeredUser = await db.register_contractor([email, hash]);
        let user = registeredUser[0];
        req.session.user = {
            contractor_email: user.contractor_email,
        };
        return res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        const foundUser = await db.get_contractor([email]);
        const user = foundUser[0];
        if(!user){
            res.status(401).json('User not found. Please reigster as a contractor before logging in.');
        }
        const isAuthenticated = await bcrypt.compareSync(password, user.password);
        if(!isAuthenticated){
            res.status(403).json('Incorrect password.');
        }
        req.session.user = {
            contractor_id: user.contractor_id,
            contractor_name: user.contractor_name,
            contractor_email: user.contractor_email,
            bio: user.bio,
            phone_number: user.phone_number,
            image_url: user.image_url
        };
        return res.send(req.session.user)
    },
    update: (req, res) => {
        const { contractor_id } = req.session.user;
        const { field_name, field_value} = req.body;

        console.log(req.body);
        const db = req.app.get('db')
        db.contractor.update({contractor_id}, {[field_name]: field_value }).then(response => {
                res.status(200).send(response)
        })
        // console.log(updated)
        // .then(res.status(200).send(updated[0]))
        // .catch(err => console.log(err))
    },
    logout: async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getOne: async (req, res) => {
        const { contractor_email } = req.body
        let contractor = await req.app.get('db').get_contractor([contractor_email])
        res.status(200).send(contractor);
    },
    userData(req, res) {
        const { user } = req.session;
        if (user) return res.status(200).send({ loggedIn: true, user });
        else return res.sendStatus(401)
    }
}