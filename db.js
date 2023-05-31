import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

const MongoURL = "mongodb://127.0.0.1:27017";

async function createconnection(){
    const client = new MongoClient(MongoURL);
    await client.connect();
    console.log("MongoDB Server Successfully Connected");
    return client;
}
export var objectid = ObjectId;
export const client = await createconnection();