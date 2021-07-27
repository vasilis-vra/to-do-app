import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    const { db } = await connectToDatabase();
    const tasksId = req.query._id;
    const projectId = req.query.project_id;
    let response;

    try {
      const response = await db
        .collection("todos")
        .update(
          { _id: ObjectId(tasksId) },
          { $pull: { projects: { project_id: projectId } } }
        );
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
