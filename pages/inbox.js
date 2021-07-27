//page imports
import styles from "../styles/TaskPage.module.css";
import React, { useState, useEffect } from "react";
import AccessDenied from "../components/AccessDenied";
import { useSession, getSession } from "next-auth/client";

//bootstrap imports
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { PlusLg, XLg, ThreeDots } from "react-bootstrap-icons";

export default function Home() {
  //function init
  const addTask = async (tasksId, value, list) => {
    const data = await fetch(
      `/api/addTask?_id=${tasksId}&list=${list}&data=${value}`
    );
    const res = await data.json();
    document.getElementById("new-task").value = "";
    if (res.result.nModified === 1 && list === "inbox_tasks") {
      setContent([...content, value]);
    }
  };

  const removeTask = async (tasksId, task) => {
    const data = await fetch(
      `/api/deleteTask?_id=${tasksId}&list=inbox_tasks&value=${task}`
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
  const [tasksId, setTasksId] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/findTasks?email=${session.user.email}&list=inbox_tasks`
      );
      const json = await res.json();
      if (json) {
        setContent(json.inbox_tasks);
        setTasksId(json._id);
      }
    };
    fetchData();
  }, [session]);
  //render authorized content
  if (content) {
    return (
      <div className={styles.container}>
        <span className="page-header">
          <h2 className="d-inline">Inbox</h2>
        </span>
        <hr />
        <main>
          <ListGroup variant="flush">
            {content.map((task, index) => {
              return (
                <ListGroup.Item
                  className="d-inline-flex justify-content-between"
                  key={index.toString()}
                >
                  <div>
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      id={index}
                      value=""
                      onChange={() => {
                        removeTask(tasksId, task);
                      }}
                      checked={false}
                    />
                    <span>{task}</span>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-primary"
                      id="dropdown-basic"
                    >
                      <ThreeDots />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          addTask(tasksId, task, "today_tasks");
                          removeTask(tasksId, task);
                        }}
                      >
                        Move to Today
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          addTask(tasksId, task, "future_tasks");
                          removeTask(tasksId, task);
                        }}
                      >
                        Move to Future
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
                  tasksId,
                  document.getElementById("new-task").value,
                  "inbox_tasks"
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
