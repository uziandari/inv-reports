const mongoose = require('mongoose');
//const loginInfo = require('../userInfo/login');
require('../models/receiptDateSchema');
require('../models/nsInventorySchema');
require('../models/caInventorySchema');

const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };    

const mongodbUri = `mongodb://localhost/invreports`;
//const mongodbUri = `mongodb://${loginInfo.user}:${loginInfo.password}@ds139082.mlab.com:39082/invreports`

mongoose.connect(mongodbUri, options);

const db = mongoose.connection;

db.on('error', (msg) => console.log(`Database connection failed with error ${msg}`));

db.once('open', () => console.log(`Database connected successfully.`))
