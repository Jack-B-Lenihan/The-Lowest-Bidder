require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const contractCtrl = require('./controllers/contractorController');
const projectCtrl = require('./controllers/projectController');
const clientCtrl = require('./controllers/clientController');

const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env
const app = express();

//middlewares
app.use(express.json());

app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2
  }
}))

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('db connected');
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//view engine setup
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars');

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: 'gmail',
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'jacklenihan300@gmail.com', // generated ethereal user
    pass: 'Happyhill1' // generated ethereal password
  },
  tls: {
    rejectunauthorized: false
  }
});

//endpoints
app.post('/send', async (req, res) => {
  const { Costs, Total, Plan, Timeframe, id } = req.body;
  const { contractor_name, contractor_email, image_url, bio, phone_number } = req.session.user;
  const db = req.app.get('db');
  const client = await db.get_client_id([id]);
  console.log(client[0].client_email);
  const output = 
  `<div>
    <h1>Someone has bid on your project</h1>

    <div>
    <img src=${image_url}/>
    <ul>
      <li>${contractor_name}</li>
      <li>${contractor_email}</li>
      <li>${phone_number}</li>
    </ul>
    <p>${bio}</p>
    </div>

    <div>
      <h2>Bid</h2>
      <h4>Total Cost:${Total}</h4> 
      <p>${Costs}</p> 
      <h4>Timeframe: ${Timeframe}</h4>
      <p>${Plan}</p>
    </div>

  </div>`;

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: 'shemar84@ethereal.email', // generated ethereal user
  //     pass: 'S5KdE7mBvHgQWf4FeX' // generated ethereal password
  //   },
  //   tls: {
  //     rejectunauthorized: false
  //   }
  // });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"The Lowest Bidder" <jacklenihan300@gmail.com>', // sender address
    to: client[0].client_email,
    subject: 'Your project', // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
)

app.post('/contractor/register', contractCtrl.register);
app.post('/contractor/login', contractCtrl.login);
app.put('/contractor/update', contractCtrl.update);
app.get('/contractor/logout', contractCtrl.logout);
app.get('/contractor/getOne', contractCtrl.getOne);

app.post('/client/register', clientCtrl.register);
app.post('/client/login', clientCtrl.login);
app.get('/client/logout', clientCtrl.logout);

app.post('/project/create', projectCtrl.create);
app.delete('/project/delete/:id', projectCtrl.delete);
app.put('/project/update/', projectCtrl.update);
app.get('/project/contractorFeed', projectCtrl.getAll);
app.get('/project/clientFeed', projectCtrl.getClientProjects);

// connection
app.listen(SERVER_PORT, () => console.log(`server listening on port: ${SERVER_PORT}`))