import { GetServerSideProps } from "next";
import { getDatabase } from "../src/getDatabase";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const mongodb = await getDatabase();

  const response = await mongodb
    .db()
    .collection("users")
    .insertOne({ email: "test@test.test" });

  const findUser = await mongodb
    .db()
    .collection("users")
    .findOne({ email: "test@test.test" });

  const users = await JSON.parse(JSON.stringify(findUser));

  return {
    props: {
      users: users.email,
    },
  };
};

const Form: React.FC<{ users: unknown }> = ({ users }) => {
  console.log(users);
  return <div>test</div>;
};

export default Form;
