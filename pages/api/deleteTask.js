import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    let response;
    let projectId;
    const { db } = await connectToDatabase();
    const tasksId = req.query._id;
    const list = req.query.list;
    const value = req.query.value;
    if (list === "projects") projectId = req.query.project_id;

    try {
      switch (list) {
        case "today_tasks":
          response = await db
            .collection("todos")
            .updateOne(
              { _id: ObjectId(tasksId) },
              { $pull: { today_tasks: value } }
            );
          break;
        case "inbox_tasks":
          response = await db
            .collection("todos")
            .updateOne(
              { _id: ObjectId(tasksId) },
              { $pull: { inbox_tasks: value } }
            );
          break;
        case "future_tasks":
          response = await db
            .collection("todos")
            .updateOne(
              { _id: ObjectId(tasksId) },
              { $pull: { future_tasks: value } }
            );
          break;
        case "projects":
          response = await db
            .collection("todos")
            .updateOne(
              { _id: ObjectId(tasksId), "projects.project_id": projectId },
              { $pull: { "projects.$.tasks": value } }
            );
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
