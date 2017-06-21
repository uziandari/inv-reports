var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Todo = new Schema({
    name : String,
    updated_at : Date
});
 
mongoose.model( 'Todo', Todo );
mongoose.connect( 'mongodb://localhost/test', () => console.log('connected to the server.') );