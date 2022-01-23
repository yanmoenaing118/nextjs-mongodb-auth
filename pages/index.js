import MeetupList from "./../components/meetup/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

export default function Home({ meetups, data }) {
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
    revalidate: 1,
  };
}
