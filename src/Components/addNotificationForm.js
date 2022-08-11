import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
//LOCAL IMPORTS
import { showNotification } from "../Store/NotificationMessages/actionCreator";
import ButtonCustom from "../Shared/Buttons/button";
import { notifyTypes } from "../Helpers/configs";

const useStlyes = makeStyles((theme) => ({
  paperWrap: {
    margin: "20px 20px 20px 0px",
    maxWidth: "700px",
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
  btnsHead: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function AddNotification(props) {
  const classes = useStlyes();
  const oldNotifcation =
    props &&
    props.alertReducer &&
    props.alertReducer.notifications &&
    props.alertReducer.notifications;
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

  //FOR CLEARING THE ADDED VALUES
  const clearValues = () => {
    setNotifyMessage("");
    setNotifyType("");
    setNotifyDur("");
  };

  //ON ADD NOTIFICATION
  const onAddNotification = () => {
    let notificationsDisplay = [...oldNotifcation];
    let newSnack = {
      timeout: Number(notifyDur),
      type: notifyType,
      message: notifyMessage,
      id: new Date().getTime() + Math.random(),
    };
    notificationsDisplay.push(newSnack);
    props.showNotification(notificationsDisplay);

    clearValues();
  };

  //ON CLOSE ADD FORM
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
          "& .MuiTextField-root": { m: 1, minWidth: "25ch" },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              style={{ width: "96%" }}
              id="notifyMessage"
              label="Notification Message"
              variant="outlined"
              value={notifyMessage}
              onChange={onTitleChange}
              multiline
              rows={3}
              size="small"
              required
              helperText="Please add notification message"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className={classes.btnsHead}
          >
            <ButtonCustom
              onClick={onAddNotification}
              disabled={!notifyMessage || !notifyType || notifyDur <= 0}
              label="Add"
            />
            <ButtonCustom onClick={onCloseForm} label="Close" variant="text" />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    alertReducer: state.alertReducer,
  };
};

export default connect(mapStateToProps, { showNotification })(
  React.memo(AddNotification)
);
