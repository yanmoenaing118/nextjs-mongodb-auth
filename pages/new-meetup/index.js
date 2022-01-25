import NewMeetupForm from "../../components/meetup/NewMeetupForm";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import Head from "next/head";
import { fetcher } from "../../lib/fetcher";

export default function NewMeetupPage() {
  const { data } = useSWR("/api/auth", fetcher);
  const router = useRouter();
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

  useEffect(() => {
    if (!data || !data.isLoggedIn) router.replace("/login");
  }, [data]);

  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta name="description" content="Add new meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHander} />
    </>
  );
}
