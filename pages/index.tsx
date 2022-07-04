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

  let isUser: boolean = false;
  if (userDB === null) {
    isUser = false;
  }
  let isNick: boolean = false;
  if (userDB?.pseudo === null || userDB?.pseudo === "") {
    isNick = false;
  } else {
    isNick = true;
  }
  console.log("\n--------------------------------------------------------", isNick);
  return {
    props: {
      isUser: isUser,
      isNick: isNick,
      pseudo: userDB?.pseudo.toString(),
    },
  };
};

const Home: React.FC<{ isUser: boolean; isNick: boolean, pseudo: unknown }> = ({
  isUser,
  isNick,
  pseudo
}) => {
  const { user } = useUser();
  return (
    <Layout>
      <div className="container">
        {user ? (
          <h1>Vous êtes connecté</h1>
        ) : (
          <Link href="/api/auth/login">
            <Button style={{ marginTop: "2em" }} variant="secondary">
              Veuillez vous connecter pour continuer
            </Button>
          </Link>
        )}
        {isNick ? `Your nickname is : ${pseudo}` : "pas pseudo"}
      </div>
    </Layout>
  );
};

export default Home;
