//page imports
import styles from "../styles/ProjectPage.module.css";
import React, { useState, useEffect } from "react";
import OverlayForm from "../components/OverlayForm";
import Link from "next/link";
import { useSession, getSession } from "next-auth/client";
//bootstrap imports
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";

export default function Projects() {
  //function init
  const deleteProject = async (contentId, projectData) => {
    const data = await fetch(
      `/api/deleteProject?_id=${contentId}&project_id=${projectData.project_id}`
    );
    const res = await data.json();
  };

  //hooks init
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  const [contentId, setContentId] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/findTasks?email=${session.user.email}&list=projects`
      );
      const json = await res.json();
      if (json) {
        setContent(json.projects);
        setContentId(json._id);
      }
    };
    fetchData();
  }, [session, content]);
  //render authorized content
  if (content) {
    return (
      <div className={styles.container}>
        <div className="d-flex justify-content-between">
          <h2 className="d-inline">Projects</h2>
          <OverlayForm tasksId={contentId} />
        </div>
        <hr />
        <main>
          <ListGroup variant="flush" className="d-flex justify-content-between">
            {content.map((data, index) => {
              return (
                <ListGroup.Item
                  key={index.toString()}
                  className="m-0 d-flex justify-content-between"
                >
                  <Link
                    href={`/project/${encodeURIComponent(data.project_id)}`}
                  >
                    <a className="link-primary">{data.title}</a>
                  </Link>
                  <Button
                    variant="danger"
                    id="deleteButton"
                    onClick={() => deleteProject(contentId, data)}
                  >
                    <Trash />
                  </Button>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <hr />
        </main>
      </div>
    );
  }
  //protect authorized content
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  } else {
    return <div className={styles.container}></div>;
  }
}

//initialize session data
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session: session,
    },
  };
}
