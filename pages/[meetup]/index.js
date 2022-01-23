import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import Head from "next/head";
export default function MeetupDetailsPage({ meetup }) {
  console.log(meetup);
  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <div className="container">
        <div className="img">
          <Image
            src={meetup.image}
            alt={meetup.title}
            width={800}
            height={400}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <h1>{meetup.title}</h1>
        <address>{meetup.address}</address>
        <p>{meetup.description}</p>
        <style jsx>{`
        .container {

        }

          position: relative;
        }
      `}</style>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const mongo_client = await MongoClient.connect(process.env.DATABASE_URI);
  const db = mongo_client.db();

  const data = await db.collection("meetups").find({}, { _id: 1 }).toArray();

  mongo_client.close();

  const paths = data.map((meetup) => {
    return {
      params: {
        meetup: meetup._id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const mongo_client = await MongoClient.connect(process.env.DATABASE_URI);
  const db = mongo_client.db();

  console.log(params);

  const data = await db
    .collection("meetups")
    .findOne({ _id: ObjectId(params.meetup) });
  mongo_client.close();
  console.log(data);
  return {
    props: {
      meetup: {
        id: data._id.toString(),
        title: data.title,
        image: data.image,
        description: data.description,
        address: data.address,
      },
    },
  };
}
