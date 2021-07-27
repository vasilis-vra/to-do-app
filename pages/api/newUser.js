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
    const email = req.query.email;
    const project_id = getRandomInt(1000000000000).toString();
    let response, search;
    try {
      search = await db.collection("todos").findOne({ email: email });
      if (!search) {
        response = await db.collection("todos").insertOne({
          email: email,
          today_tasks: ["Example task"],
          inbox_tasks: ["Example task"],
          future_tasks: ["Example task"],
          projects: [
            {
              project_id: project_id,
              title: "My first project",
              tasks: ["Example project task"],
            },
          ],
        });
        res.status(200).json(response);
      }
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Error in GET request to API" });
    }
  } else {
    res.status(401).json({ success: false, message: "Not signed in" });
  }
}
