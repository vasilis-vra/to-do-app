import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { useRouter } from "next/router";

export default function OverlayForm(props) {
  //ruter to refresh project data after adding new project
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) document.getElementById("doneButton").click();
  };

  const createProject = async (value) => {
    const data = await fetch(
      `/api/createProject?_id=${props.tasksId}&title=${value}`
    );
    const res = await data.json();
    document.getElementById("new-project").value = "";
    if (res.result.nModified === 1) {
      refreshData();
    }
  };

  return (
    <OverlayTrigger
      placement="bottom"
      rootClose
      trigger="click"
      overlay={
        <Popover>
          <Popover.Title as="h3">Choose a title</Popover.Title>
          <Popover.Content>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Project Title"
                aria-label="new project"
                aria-describedby="new project"
                id="new-project"
                autocomplete="off"
                onKeyUp={handleKeyPress}
              />
              <Button
                variant="primary"
                id="doneButton"
                onClick={() =>
                  createProject(document.getElementById("new-project").value)
                }
              >
                Done
              </Button>
            </InputGroup>
          </Popover.Content>
        </Popover>
      }
    >
      <Button variant="primary">Create</Button>
    </OverlayTrigger>
  );
}
