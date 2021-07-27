import { connectToDatabase } from "../../util/mongodb";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    const { db } = await connectToDatabase();
    const userEmail = req.query.email;
    const list = req.query.list;
    let response;
    try {
      switch (list) {
        case "today_tasks":
          response = await db
            .collection("todos")
            .findOne({ email: userEmail }, { projection: { today_tasks: 1 } });
          break;
        case "inbox_tasks":
          response = await db
            .collection("todos")
            .findOne({ email: userEmail }, { projection: { inbox_tasks: 1 } });
          break;
        case "future_tasks":
          response = await db
            .collection("todos")
            .findOne({ email: userEmail }, { projection: { future_tasks: 1 } });
          break;
        case "projects":
          response = await db
            .collection("todos")
            .findOne({ email: userEmail }, { projection: { projects: 1 } });
          break;
      }
      res.status(200).json(response);
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Error in GET request to API" });
    }
  } else {
    res.status(401).json({ success: false, message: "Not signed in" });
  }
}
