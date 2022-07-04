import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import Layout from "../../components/layout";
import { getDatabase } from "../../src/getDatabase";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);
  const email = session?.user.email;

  const mongodb = await getDatabase();
  const response = await mongodb
    .db()
    .collection("users")
    .findOne({ email: email });
  const userDB = JSON.parse(JSON.stringify(response));
  console.log(userDB);

  let isUser: boolean = false;
  if (userDB === null) {
    isUser = false;
  }
  return {
    props: {
      isUser: isUser,
      email: email,
    },
  };
};

const Home: React.FC<{ isUser: boolean; email: string }> = ({
  isUser,
  email,
}) => {
  const [nickname, setNickname] = React.useState("");
  const handleChange = (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();
    setNickname(e.target.value);
  };
  const handleSubmit = (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();
    const temp = {
      pseudo: nickname,
      email: email,
    };
    fetch("/api/insertNickname", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    }).then(() => router.push("/"));
  };
  return (
    <Layout>
      <div className="container" style={{ marginTop: "1em" }}>
        {isUser ? (
          <>pseudo</>
        ) : (
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Choose a nickname :&nbsp;&nbsp;&nbsp;&nbsp;</label>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="choose a nickname..."
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <Button className="send-button" onClick={handleSubmit}>
                    Submit &rarr;
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Home;
