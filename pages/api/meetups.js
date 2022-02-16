import { MongoClient } from "mongodb";

export default async function handler(req,res) {

    const mongo_client = await MongoClient.connect(process.env.DATABASE_URI);
    const db = mongo_client.db();
  
    const data =  (await db.collection("meetups").find().toArray());
  

    const meetups = data.map((meetup) => {
        return {
          id: meetup._id.toString(),
          title: meetup.title,
          address: meetup.address,
          description: meetup.description,
          image: meetup.image,
        };
      });

      res.status(200).json(meetups)
}