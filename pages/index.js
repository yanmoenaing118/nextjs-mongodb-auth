import MeetupList from "./../components/meetup/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
const DUMMY_LIST = [
  {
    id: 1,
    title: "First Meetup",
    image:
      "https://i.pinimg.com/originals/4b/df/9f/4bdf9f66ae7e5e58ab6c91d4ba07297d.jpg",
    address: "Some address 1234, Some city 12",
    description: "This is first meetup",
  },

  {
    id: 2,
    title: "Second Meetup",
    image:
      "https://i.pinimg.com/originals/87/bb/13/87bb13aac4d119da77231b3957c6dcf6.jpg",
    address: "Some address 1234, Some city 12",
    description: "This is Second meetup",
  },
];

export default function Home({ meetups, data }) {
  console.log(data);
  return (
    <>
      <Head>
        <title>Next JS meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

export async function getStaticProps() {
  const mongo_client = await MongoClient.connect(process.env.DATABASE_URI);
  const db = mongo_client.db();

  const data = await db.collection("meetups").find().toArray();

  return {
    props: {
      meetups: data.map((meetup) => {
        return {
          id: meetup._id.toString(),
          title: meetup.title,
          address: meetup.address,
          description: meetup.description,
          image: meetup.image,
        };
      }),
    },
  };
}
