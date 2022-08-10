import React, { useState } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
//LOCAL IMPORTS
import { showSnackBar } from "../Store/AlertMessages/actionCreator";

//FOR NOTIFICATION VARIANT TYPES
const notifyTypes = [
  {
    value: "success",
    label: "Success",
  },
  {
    value: "warning",
    label: "Warning",
  },
  {
    value: "normal",
    label: "Normal",
  },
  {
    value: "error",
    label: "Error",
  },
  {
    value: "info",
    label: "Info",
  },
];

const useStlyes = makeStyles((theme) => ({
  paperWrap: {
    margin: "auto",
    width: "500px",
    borderRadius: "10px",
    padding: "20px",
    alignContent: "center",
    boxShadow:
      "rgb(6 24 44 / 15%) 0px 0px 0px 2px, rgb(6 24 44 / 39%) 0px 2px 5px -1px, rgb(255 255 255 / 6%) 0px 1px 0px inset",
  },
  titleWrap: {
    textAlign: "center",
    color: "#2e8eec",
    fontSize: "20px",
    marginBottom: "20px",
  },
  addBtnWrap: {
    color: "#ffffff",
    textTransform: "none",
    margin: "20px",
  },
  clsBtnWrap: {
    color: "#2e8eec",
    textTransform: "none",
  },
}));

function AddNotification(props) {
  const classes = useStlyes();
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyType, setNotifyType] = useState("");
  const [notifyDur, setNotifyDur] = useState("");

  //ON TITLE CHANGE
  const onTitleChange = (event) => {
    setNotifyMessage(event.target.value);
  };

  //ON TYPE CHANGE
  const onTypeChange = (event) => {
    setNotifyType(event.target.value);
  };

  //ON DURATION CHANGE
  const onDurationChange = (event) => {
    setNotifyDur(event.target.value);
  };

  //ON ADD NOTIFICATION
  const onAddNotification = () => {
    let notificationsDisplay = [];
    let newSnack = {
      state: true,
      timeout: Number(notifyDur),
      type: notifyType,
      message: notifyMessage,
      key: new Date().getTime + Math.random(),
    };

    notificationsDisplay = [...notificationsDisplay];
    notificationsDisplay.push(newSnack);
    props.showSnackBar(notificationsDisplay);
  };

  //ON CLOSE FORM
  const onCloseForm = () => {
    props.closeNotifyForm();
  };

  return (
    <Paper className={classes.paperWrap}>
      <Typography className={classes.titleWrap}>
        Add New Notification
      </Typography>
      <Box
        component="form"
        onSubmit={onAddNotification}
        autoComplete="off"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <TextField
          id="notifyMessage"
          label="Notification Message"
          variant="outlined"
          value={notifyMessage}
          onChange={onTitleChange}
          required
          helperText="Please add notification message"
        />
        <TextField
          id="notifytype"
          label="Notification Type"
          variant="outlined"
          select
          value={notifyType}
          onChange={onTypeChange}
          required
          helperText="Please select notification type"
        >
          {notifyTypes &&
            notifyTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          id="notifydur"
          label="Notification Duration"
          type="number"
          variant="outlined"
          helperText="Please add autohide duration"
          value={notifyDur}
          onChange={onDurationChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <Button
        className={classes.addBtnWrap}
        variant="contained"
        onClick={onAddNotification}
        disabled={!notifyMessage || !notifyType || !notifyDur}
      >
        Add
      </Button>
      <Button
        className={classes.clsBtnWrap}
        onClick={() => {
          onCloseForm();
        }}
      >
        Close
      </Button>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { showSnackBar })(
  React.memo(AddNotification)
);
