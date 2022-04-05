import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export default function CreateVMDialog() {
  const [open, setOpen] = React.useState(false);
  const [template_selection, setTemplateSelection] = React.useState("");
  const [template_list, setTemplateList] = React.useState([]);
  const [vm_name, setVmName] = React.useState("");
  const [user_list, setUserList] = React.useState([]);
  const [user_selection, setUserSelection] = React.useState("");
  const [is_elastic, setIsElastic] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // console.log(vm_name);
    setOpen(false);
  };

  const changeSpecs = (event) => {};

  const change_template = (event) => {
    setTemplateSelection(event.target.value);
    // console.log(event.target.value);
    setIsElastic(Boolean(event.target.value.elastic_enrolled));
    // console.log(is_elastic);
  };

  const change_user = (event) => {
    setUserSelection(event.target.value);
    // console.log(event.target.value);
  };

  const set_vm_name = (event) => {
    setVmName(event.target.value);
  };

  const set_is_elastic = (event) => {
    setIsElastic(event.target.checked);
    // console.log(event.target.checked);
  };

  // Make a GET request to the server to get the list of templates
  // and map them to a dropdown menu
  const get_templates = () => {
    fetch("https://api.rellis.dev/get.php?q=get_templates")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        var template_list = data.map(function (template) {
          return (
            <MenuItem key={template.template_name} value={template}>
              {template.template_name}
            </MenuItem>
          );
        });
        setTemplateList(template_list);
      });
  };

  // Make a GET request to the server to get the list of users
  // and map them to a dropdown menu
  const get_users = () => {
    fetch("https://api.rellis.dev/get.php?q=get_users")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        var user_list = data.map(function (user) {
          return (
            <MenuItem key={user.user_name} value={user.user_name}>
              {user.user_name}
            </MenuItem>
          );
        });
        setUserList(user_list);
      });
  };

  // Get the list of templates on page load, and set the state
  React.useEffect(() => {
    get_templates();
    get_users();
  }, []);

  // Make a POST request to the server to create a new VM
  const create_vm = () => {
    fetch("https://api.rellis.dev/create_vm.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template_name: template_selection.template_name,
        user_name: user_selection,
        vm_name: vm_name,
        is_elastic: is_elastic,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleClose();
      });
  };

  return (
    <div>
      <Tooltip
        title="Create a new virtual machine in Harvester"
        placement="top"
      >
        <Button
          variant="contained"
          color="success"
          style={{ width: "100px" }}
          onClick={() => {
            // Set the state of the dialog to open
            handleClickOpen();
          }}
          startIcon={<AddIcon />}
        >
          Create
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Virtual Machine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a virtual machine, please enter the name, select a
            template, a user name, and click "Create".
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="VM Name"
            type="text"
            fullWidth
            variant="filled"
            autoComplete="off"
            InputLabelProps={{ required: true }}
            // On change, set the value of the vm_name variable
            onChange={set_vm_name}
          />
          <FormControl sx={{ m: 2, minWidth: "46%" }}>
            <InputLabel htmlhtmlFor="template">Template</InputLabel>
            <Select
              value={template_selection}
              label="template"
              onChange={change_template}
              inputProps={{
                name: "template",
                id: "template",
              }}
            >
              {template_list}
            </Select>
          </FormControl>

          <FormControl sx={{ mt: 2, minWidth: "46%" }}>
            <InputLabel htmlhtmlFor="user">User</InputLabel>
            <Select
              value={user_selection}
              onChange={change_user}
              label="user"
              inputProps={{
                name: "user",
                id: "user",
              }}
            >
              {user_list}
            </Select>
          </FormControl>

          {/* Customize button with dropdown for more specs (CPU Cores, RAM, etc.) */}
          <Button
            color="primary"
            variant="outline"
            startIcon={<EditIcon />}
            onClick={changeSpecs}
          >
            Customize
          </Button>

          <Tooltip title="Elastic Agent logs data into the Elasticsearch database for future machine learning usage">
            <FormControlLabel
              control={
                <Switch
                  checked={is_elastic}
                  onChange={set_is_elastic}
                  name="is_elastic"
                  color="primary"
                />
              }
              label="Install Elastic Agent"
            />
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={create_vm}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
