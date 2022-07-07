import Link from "next/link";
import type { GetServerSideProps } from "next/types";
import { Button, Form } from "react-bootstrap";
import Layout from "../components/layout";
import { useUser } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import { getDatabase } from "../src/getDatabase";
import React from "react";
import router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);
  const email = session?.user.email;

  const mongodb = await getDatabase();
  const response = await mongodb
    .db()
    .collection("users")
    .findOne({ email: email });
  const userDB = JSON.parse(JSON.stringify(response));

  let isNick: boolean = false;
  if (userDB?.pseudo === null || userDB?.pseudo === "") {
    isNick = false;
  } else {
    isNick = true;
  }

  let pseudo: string = userDB?.pseudo.toString();
  if (userDB?.pseudo === undefined) {
    pseudo = "Inexistant";
  }

  return {
    props: {
      isNick: isNick,
      pseudo: pseudo,
      email: userDB?.email,
    },
  };
};

const Home: React.FC<{ isNick: boolean; pseudo: unknown; email: unknown }> = ({
  isNick,
  pseudo,
  email,
}) => {
  const { user } = useUser();
  const [ticketTitle, setTicketTitle] = React.useState("");
  const [ticketContent, SetTicketContent] = React.useState("");
  const handleTitle = (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();
    setTicketTitle(e.target.value);
    console.log(ticketTitle);
  };
  const handleContent = (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();
    SetTicketContent(e.target.value);
    console.log(ticketContent);
    const temp = {
      pseudo: pseudo,
      email: email,
      ticket_title: ticketTitle,
      ticket_content: ticketContent,
    };
  };
  const handleSubmit = (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();
    const temp = {
      pseudo: pseudo,
      email: email,
      ticket_title: ticketTitle,
      ticket_content: ticketContent,
    };
    fetch("/api/insertTicketInDb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    }).then(() => router.push("/"));
  };
  return (
    <Layout>
      <div className="container">
        {!user ? (
          <Link href="/api/auth/login">
            <Button style={{ marginTop: "2em" }} variant="secondary">
              Veuillez vous connecter pour continuer &rarr;
            </Button>
          </Link>
        ) : isNick ? (
          <div className="container" style={{ marginTop: "1em" }}>
            {`Pseudo : ${pseudo}`}
            <br />
            <Link href="/choose-nickname">
              <Button style={{ marginTop: "0.5em" }} variant="secondary">
                Changer de pseudo &rarr;
              </Button>
            </Link>
            <br />
            <Form.Label style={{ marginTop: "1.5em" }}>Title</Form.Label>
            <Form.Control
              type="text"
              onChange={handleTitle}
              placeholder="Title of ticket"
            />
            <Form.Group
              style={{ marginTop: "1.5em" }}
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              onChange={handleContent}
            >
              <Form.Label>Ticket content</Form.Label>
              <Form.Control
                placeholder="ticket content"
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button className="send-button" onClick={handleSubmit}>
              Submit &rarr;
            </Button>
          </div>
        ) : (
          "pas pseudo"
        )}
      </div>
    </Layout>
  );
};

export default Home;
