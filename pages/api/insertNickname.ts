import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../src/getDatabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body.email;
  const pseudo = req.body.pseudo;
  const mongodb = await getDatabase();
  const isUser = await mongodb
    .db()
    .collection("users")
    .findOne({ email: email });
  if (isUser) {
    await mongodb
      .db()
      .collection("users")
      .updateOne({ email: email }, { $set: { pseudo: pseudo } });
  } else {
    await mongodb.db().collection("users").insertOne({
      pseudo: pseudo,
      email: email,
      tickets: {},
    });
  }
  res.end();
}
