import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, Tooltip} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export default function CreateVMDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeSpecs = (event) => {
    
    };

  var template_selection = "kali";
  var user_selection = "tyler_harrison";

  return (
    <div>
    <Tooltip title="Create a new virtual machine in Harvester" placement="top">
        <Button variant="contained" color="success" style={{width: "100px"}}
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
            To create a virtual machine, please enter the name, select a template, a user name, and click "Create".
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
            InputLabelProps={{required: true}}
            
          />
          <FormControl sx={{ m: 2, minWidth: "46%" }}>
              <InputLabel htmlFor="template">Template</InputLabel>
              <Select
                value={template_selection}
                // onChange={changeTemplate}
                label="template"
                inputProps={{
                  name: 'template',
                  id: 'template',
                }}
              >
                <MenuItem value="kali">Kali Linux</MenuItem>
                <MenuItem value="lubuntu">Lubuntu</MenuItem>
                <MenuItem value="debian11">Debian 11</MenuItem>
                <MenuItem value="android">Android</MenuItem>
                <MenuItem value="windows10">Windows 10</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 2, minWidth: "46%" }}>
              <InputLabel htmlFor="user">User</InputLabel>
              <Select
                value={user_selection}
                // onChange={changeUser}
                label="user"
                inputProps={{
                  name: 'user',
                  id: 'user',
                }}
              >
                <MenuItem value="tyler_harrison">Tyler Harrison</MenuItem>
                <MenuItem value="truman_brown">Truman Brown</MenuItem>
                <MenuItem value="augustine_solis">Augustine Solis</MenuItem>
                <MenuItem value="sudip_koirala">Sudip Koirala</MenuItem>
              </Select>
            </FormControl>

            {/* Customize button with dropdown for more specs (CPU Cores, RAM, etc.) */}
            <Button color="primary" variant="outline" startIcon={<EditIcon />} onClick={changeSpecs}>
                Customize
            </Button>
            
            <Tooltip title="Elastic Agent logs data into the Elasticsearch database for future machine learning usage">
                <FormControlLabel control={<Switch defaultChecked />} label="Install Elastic Agent" />
            </Tooltip>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
