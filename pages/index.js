import MeetupList from "./../components/meetup/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import useToken from "../lib/auth/useToken";
import { useEffect } from "react";

export default function Home({ meetups, data }) {
  useEffect(() => {
    const chatbox = document.getElementById("fb-customer-chat");
    chatbox.setAttribute("page_id", "108012321864036");
    chatbox.setAttribute("attribution", "biz_inbox");
  }, []);

  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        xfbml: true,
        version: "v13.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // <!-- Messenger Chat Plugin Code -->
  //   <div id="fb-root"></div>

  //   <!-- Your Chat Plugin code -->
  //   <div id="fb-customer-chat" class="fb-customerchat">
  //   </div>

  //   <script>
  //     var chatbox = document.getElementById('fb-customer-chat');
  //     chatbox.setAttribute("page_id", "108012321864036");
  //     chatbox.setAttribute("attribution", "biz_inbox");
  //   </script>

  //   <!-- Your SDK code -->
  //   <script>
  //     window.fbAsyncInit = function() {
  //       FB.init({
  //         xfbml            : true,
  //         version          : 'v13.0'
  //       });
  //     };

  //     (function(d, s, id) {
  //       var js, fjs = d.getElementsByTagName(s)[0];
  //       if (d.getElementById(id)) return;
  //       js = d.createElement(s); js.id = id;
  //       js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
  //       fjs.parentNode.insertBefore(js, fjs);
  //     }(document, 'script', 'facebook-jssdk'));
  //   </script>
  const { token } = useToken();
  return (
    <>
      <Head>
        <title>Next JS meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups"
        />
      </Head>
      <MeetupList meetups={meetups} token={token} />
      <footer>
        <div id="fb-root"></div>
        <div id="fb-customer-chat" class="fb-customerchat"></div>
      </footer>
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
