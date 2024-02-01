const {MongoClient} = require('mongodb');
const mongoURl="mongodb://localhost:27017"
const database = "test"
collectionName = "tests"
const client = new MongoClient(mongoURl)



const getdatabase = async()=>{

    let result = await client.connect();
    let db =  result.db(database)
    return coll = db.collection(collectionName)
}


    // let res = await db.collection('tests');
    // console.log(res);




module.exports=getdatabase;
