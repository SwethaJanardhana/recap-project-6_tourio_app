import styled from "styled-components";
import Card from "../components/Card.js";
import useSWR from "swr";
import Link from "next/link.js";
import { StyledLink } from "../components/StyledLink.js";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
`;
const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

const StyledDiv = styled.div`
text-align:center;
color: green;
font-size:1.5rem;
font:bold;
margin:0.5rem;
padding-top:0.5rem;
padding-bottom:0.5rem;
padding-left:0.5rem;
-webkit-animation: cssAnimation 0s ease-in 1s forwards;
-webkit-animation-fill-mode: forwards;
animation-fill-mode: forwards;
}
@keyframes cssAnimation {
to {
    width:0;
    height:0;
    overflow:hidden;
}
}
@-webkit-keyframes cssAnimation {
to {
    width:0;
    height:0;
    visibility:hidden;
}
`;

export default function Home({ statusText }) {
  const { data } = useSWR("/api/places", { fallbackData: [] });

  function displayMessage() {
    let text = "";
    if (statusText) {
      if (statusText.includes("Add")) {
        text = "Place added successfully.";
      } else if (statusText.includes("Edit")) {
        text = "Place updated successfully.";
      } else if (statusText.includes("Delete")) {
        text = "Place deleted successfully.";
      }
      return text;
    }
  }

  return (
    <>
      <StyledDiv>{displayMessage()}</StyledDiv>
      <List role="list">
        {data.map((place) => {
          return (
            <ListItem key={place._id}>
              <Card
                name={place.name}
                image={place.image}
                location={place.location}
                id={place._id}
              />
            </ListItem>
          );
        })}
      </List>
      <Link href="/create" passHref legacyBehavior>
        <FixedLink>+ place</FixedLink>
      </Link>
    </>
  );
}
