import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";
import { getSession } from "next-auth/client";

//random number generator till max-1
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    const { db } = await connectToDatabase();
    const tasksId = req.query._id;
    const title = req.query.title;
    const project_id = getRandomInt(1000000000000).toString();
    let response;
    try {
      response = await db.collection("todos").update(
        { _id: ObjectId(tasksId) },
        {
          $push: {
            projects: { project_id: project_id, title: title, tasks: [] },
          },
        }
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
