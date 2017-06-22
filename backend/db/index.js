const mongoose = require('mongoose');
const loginInfo = require('../userInfo/login');
require('../models/receiptDateSchema');

mongoose.connect(`mongodb://${loginInfo.user}:${loginInfo.password}@ds135382.mlab.com:35382/invreports`);

const db = mongoose.connection;

db.on('error', (msg) => console.log(`Database connection failed with error ${msg}`));

db.once('open', () => console.log(`Database connected successfully.`))
