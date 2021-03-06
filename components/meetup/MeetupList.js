import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          token={props.token}
        />
      ))}

      <style jsx>{`
        ul {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          grid-gap: 20px;
        }
      `}</style>
    </ul>
  );
}

export default MeetupList;
