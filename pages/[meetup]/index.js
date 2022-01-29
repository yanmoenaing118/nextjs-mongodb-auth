import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import Head from "next/head";
import useToken from "../../lib/auth/useToken";
import { useEffect } from "react";
import router from "next/router";
import Link from "next/link";
export default function MeetupDetailsPage({ meetup }) {
  const { token } = useToken();

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <div className="container">
        {!token ? (
          <Link href="/login">
            <a>Login to view meetup details</a>
          </Link>
        ) : (
          <>
            <div className="img">
              <img src={meetup.image} alt={meetup.title} />
            </div>

            <h1>{meetup.title}</h1>
            <address>{meetup.address}</address>
            <p>{meetup.description}</p>
          </>
        )}
        <style jsx>{`
          .container {
            width: 100%;
          }
        .img {

          max-width: 800px;
          margin: 0 auto;
          height: auto;

        }

        img {
          width: 100%;
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
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const mongo_client = await MongoClient.connect(process.env.DATABASE_URI);
  const db = mongo_client.db();

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
