import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Layout from "../../components/layout";
import { getDatabase } from "../../src/getDatabase";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);
  const email = session?.user.email;

  const mongodb = await getDatabase();
  const response = mongodb.db().collection("tickets").find({ email: email });
  const userTickets = JSON.parse(JSON.stringify(response));
  console.log(userTickets);
  return {
    props: {
      userTickets: userTickets,
    },
  };
};

const ListOfTickets: React.FC<{ userTickets: unknown }> = ({ userTickets }) => {
  return (
    <Layout>
      <div className="container">
        <h1>TEST</h1>
      </div>
    </Layout>
  );
};

export default ListOfTickets;
