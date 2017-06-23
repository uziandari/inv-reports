const mongoose = require('mongoose');
const loginInfo = require('../userInfo/login');
require('../models/receiptDateSchema');
require('../models/nsInventorySchema');

const options = { server: { socketOptions: { keepAlive: 150000, connectTimeoutMS: 150000 } }, 
                replset: { socketOptions: { keepAlive: 150000, connectTimeoutMS : 150000 } } };    

const mongodbUri = `mongodb://${loginInfo.user}:${loginInfo.password}@ds135382.mlab.com:35382/invreports`;

mongoose.connect(mongodbUri, options);

const db = mongoose.connection;

db.on('error', (msg) => console.log(`Database connection failed with error ${msg}`));

db.once('open', () => console.log(`Database connected successfully.`))
