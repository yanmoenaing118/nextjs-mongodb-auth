import NewMeetupForm from "../../components/meetup/NewMeetupForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import useToken from "../../lib/auth/useToken";
import Link from "next/link";

export default function NewMeetupPage() {
  const { token } = useToken();
  const router = useRouter();

  useEffect(() => {
    console.log("token ", token);
  }, [token]);

  async function addMeetupHander(meetup) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetup),
    });

    const result = await response.json();

    console.log(result);

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta name="description" content="Add new meetup" />
      </Head>
      {!token ? (
        <Link href="/login">
          <a>Login to add a meetup</a>
        </Link>
      ) : (
        <NewMeetupForm onAddMeetup={addMeetupHander} />
      )}
    </>
  );
}
