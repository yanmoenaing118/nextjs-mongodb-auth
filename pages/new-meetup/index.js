import NewMeetupForm from "../../components/meetup/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";
export default function NewMeetupPage() {
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
