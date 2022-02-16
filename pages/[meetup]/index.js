import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import MeetupList from "../../components/meetup/MeetupList";
import Head from "next/head";
import useToken from "../../lib/auth/useToken";
import { useEffect, useState } from "react";
import router from "next/router";
import Link from "next/link";
import useMeetups from "../../lib/useMeetups";
export default function MeetupDetailsPage({ meetup }) {
  const { token } = useToken();
  const { meetups } = useMeetups();

  const [love, setLove] = useState(false);

  function toggleLove() {
    if(!token) {
      return router.push("/login");
    }
    setLove(!love);
  }
  useEffect(() => {
    console.log(meetups);
  }, [meetups]);
  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <div className="container">
        <div className="img">
          <img src={meetup.image} alt={meetup.title} />
        </div>

        <h1>{meetup.title}</h1>
        <div onClick={toggleLove}>
          {love ? (
            <AiFillHeart size={32} color="red" />
          ) : (
            <AiOutlineHeart size={32} color="red" />
          )}
        </div>
        <address>{meetup.address}</address>
        <p>{meetup.description}</p>

        {meetups && <MeetupList meetups={meetups} token={token} />}
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
