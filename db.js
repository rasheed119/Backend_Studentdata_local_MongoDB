import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

const MongoURL = "mongodb+srv://AbdurRasheed:Rasheed0@cluster0.ojqryiw.mongodb.net/?retryWrites=true&w=majority";

async function createconnection(){
    const client = new MongoClient(MongoURL);
    await client.connect();
    console.log("MongoDB Server Successfully Connected");
    return client;
}
export var objectid = ObjectId;
export const client = await createconnection();