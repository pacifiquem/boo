const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require('mongoose');

module.exports = ( async function dbConnection() {

    try {
        // const mongoServer = await MongoMemoryServer.create();
        // const db_url = mongoServer.getUri();
    
        // Connect to the MongoDB server
        let conn = await mongoose.connect(process.env.DEV_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    
        if( conn ) {
            console.log('Connected to MongoDB');
        }else {
            console.log('Connection to DB failed');
            process.exit(1);
        }

    } catch (error) {
        console.error("Connection to DataBase failed: ", error.message);
        process.exit(1);
    }
})();