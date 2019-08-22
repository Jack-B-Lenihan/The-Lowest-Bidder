const bcrypt = require('bcryptjs');

module.exports = {
    create: async (req, res) => {
        const { project_name, project_type, current_image_url, desired_image_url, description, city, state, completed} = req.body;
        const {client_id} = req.session.user 
        console.log(client_id)
        const db = await req.app.get('db').create_project([project_name, project_type, current_image_url, desired_image_url, description, city, state, client_id, completed]);
        res.sendStatus(200);
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const db = await req.app.get('db').delete_project([id])
        res.sendStatus(200);
    },
    update: async (req, res) => {
        const { field_name, field_value, project_id } = req.body;
        const db = await req.app.get('db').update_project([field_name, field_value, project_id]);
        res.sendStatus(200);
    },
    getAll: async (req, res) => {
        const projectFeed = await req.app.get('db').get_all_projects();
        res.status(200).send(projectFeed);
    },
    getClientProjects: async (req, res) => {
        const clientProjects = await req.app.get('db').get_client_projects([req.session.user.client_id]);
        res.status(200).send(clientProjects);
    }
}