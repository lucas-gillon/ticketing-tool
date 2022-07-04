import Link from "next/link";
import type { GetServerSideProps } from "next/types";
import { Button } from "react-bootstrap";
import Layout from "../components/layout";
import { useUser } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import { getDatabase } from "../src/getDatabase";

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
    pseudo = "you don't have pseudo";
  }

  return {
    props: {
      isNick: isNick,
      pseudo: pseudo,
    },
  };
};

const Home: React.FC<{ isNick: boolean; pseudo: unknown }> = ({
  isNick,
  pseudo,
}) => {
  const { user } = useUser();
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
            {`Your nickname is : ${pseudo}`}<br />
            <Link href="/choose-nickname">
              <Button style={{ marginTop: "0.5em" }} variant="secondary">
                choisir pseudo &rarr;
              </Button>
            </Link>
          </div>
        ) : (
          "pas pseudo"
        )}
      </div>
    </Layout>
  );
};

export default Home;
