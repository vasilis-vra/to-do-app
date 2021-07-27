//page imports
import styles from "../../styles/TaskPage.module.css";
import React, { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/client";

//get prject id from the route query
import getProjectId from "../../components/getProjectId";

//bootstrap imports
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { PlusLg, XLg } from "react-bootstrap-icons";

export default function Project() {
  //function init
  const addTask = async (contentId, projectId, value) => {
    const data = await fetch(
      `/api/addTask?_id=${contentId}&list=projects&project_id=${projectId}&data=${value}`
    );
    const res = await data.json();
    document.getElementById("new-task").value = "";
    if (res.result.nModified === 1) {
      setContent([...content, value]);
    }
  };

  const removeTask = async (contentId, projectId, task) => {
    const data = await fetch(
      `/api/deleteTask?_id=${contentId}&list=projects&project_id=${projectId}&value=${task}`
    );
    const res = await data.json();
    if (res.result.nModified === 1) {
      let newArray = [...content];
      newArray.splice(content.indexOf(task), 1);
      setContent(newArray);
    }
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) document.getElementById("addButton").click();
  };
  //hooks init
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  const [contentId, setContentId] = useState();
  const [projectTitle, setProjectTitle] = useState();
  const projectId = getProjectId().toString();
  let projectIndex = null;

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/findTasks?email=${session.user.email}&list=projects`
      );
      const json = await res.json();
      if (json) {
        //find project in the Array and validate it's existance

        json.projects.map((value, index) => {
          if (value.project_id === projectId) {
            projectIndex = index;
          }
        });
        //validate that project exists
        if (projectIndex === null) {
          return (
            <div className="d-flex m-5 justify-content-center">
              <h3>Error 404: Project not found</h3>
            </div>
          );
        }
        setContent(json.projects[projectIndex].tasks);
        setContentId(json._id);
        setProjectTitle(json.projects[projectIndex].title);
      }
    };
    fetchData();
  }, [session]);

  //render authorized content
  if (content) {
    return (
      <div className={styles.container}>
        <span className="page-header">
          <h2 className="d-inline">{projectTitle}</h2>
        </span>
        <hr />
        <main>
          <ListGroup variant="flush">
            {content.map((task, index) => {
              return (
                <ListGroup.Item key={index.toString()}>
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    id={index}
                    value=""
                    onChange={() => {
                      removeTask(contentId, projectId, task);
                    }}
                    checked={false}
                  />
                  <span>{task}</span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="New task"
              aria-label="New task"
              aria-describedby="basic-addon2"
              id="new-task"
              autocomplete="off"
              onKeyUp={handleKeyPress}
            />
            <Button
              variant="primary"
              id="addButton"
              onClick={() =>
                addTask(
                  contentId,
                  projectId,
                  document.getElementById("new-task").value
                )
              }
            >
              <PlusLg />
            </Button>
            <Button
              variant="danger"
              id="cancelButton"
              onClick={() => (document.getElementById("new-task").value = "")}
            >
              <XLg />
            </Button>
          </InputGroup>
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
