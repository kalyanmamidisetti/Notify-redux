import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
//LOCAL IMPORTS
import {
  showNotification,
  removeAllNotifications,
  closeNotification,
} from "../Store/NotificationMessages/actionCreator";
import AddNotificationForm from "./addNotificationForm";
import ButtonCustom from "../Shared/Buttons/button";

const useStlyes = makeStyles((theme) => ({
  mainWrap: {
    padding: "0px 30px",
  },
  titleWrap: {
    fontSize: "22px",
    color: "#2e8eec",
    textAlign: "center",
    padding: "14px",
    fontWeight: "bold",
    flex: 1,
  },
  dividerWrap: {
    height: "1px",
    borderWidth: 0,
    marginBottom: "20px",
    color: "#707070",
    backgroundColor: "#707070",
  },
  btnWrap: {
    color: "#2e8eec",
    textTransform: "none",
    marginRight: "20px",
    borderRadius: "10px",
  },
}));

function NotificationsView(props) {
  const classes = useStlyes();
  const defaultNotifications =
    props && props.alertReducer && props.alertReducer;
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const hideTime =
      defaultNotifications &&
      defaultNotifications[0] &&
      defaultNotifications[0].timeout
        ? defaultNotifications[0].timeout
        : 2000;
    const interval = setInterval(() => {
      if (defaultNotifications.length) {
        props.closeNotification({
          id: defaultNotifications[0].id,
        });
      }
    }, hideTime);
    return () => {
      clearInterval(interval);
    };
  }, [props, defaultNotifications]);

  //ON ADDING NEW NOTIFICATION CLICK
  const addNewNotifyClick = () => {
    setShowAddForm(true);
  };

  //ON CLOSE NEW NOTIFICATION CLICK
  const closeNotifyForm = () => {
    setShowAddForm(false);
  };

  //ON ADD NOTIFICATION
  const onAddNotification = (type, message) => {
    if (type === "clearall") {
      props.removeAllNotifications([]);
    } else {
      let oldNotifications = [...defaultNotifications];
      let newNotification = {
        id: new Date().getTime() + Math.random(),
        type: type,
        time: 2000,
        message: message,
      };
      oldNotifications.push(newNotification);
      props.showNotification(oldNotifications);
    }
  };

  //FOR RENDERING THE TYPE BUTTONS
  const renderBtnType = (type, label, message) => {
    return (
      <ButtonCustom
        onClick={() => {
          onAddNotification(type, message);
        }}
        label={label}
      />
    );
  };

  return (
    <div className={classes.mainWrap}>
      <Typography className={classes.titleWrap}>Notifications Stack</Typography>
      <Divider className={classes.dividerWrap} />
      {renderBtnType("success", "Success", "Your data has been saved.")}
      {renderBtnType("error", "Error", "Opps! Something went wrong...")}
      {renderBtnType(
        "warning",
        "Warning",
        "Your password will expire in 2 days!"
      )}
      {renderBtnType("info", "Information", "You have 1 new message!")}
      {renderBtnType("normal", "Unstyled", "Hanna Moos likes your status.")}
      <Button
        variant="outlined"
        className={classes.btnWrap}
        startIcon={<AddIcon />}
        disabled={showAddForm}
        onClick={() => {
          addNewNotifyClick();
        }}
      >
        Notification
      </Button>
      {defaultNotifications && defaultNotifications.length
        ? renderBtnType("clearall", "Clear All")
        : null}
      {showAddForm ? (
        <AddNotificationForm closeNotifyForm={closeNotifyForm} />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    alertReducer: state.alertReducer.notifications,
  };
};

export default connect(mapStateToProps, {
  showNotification,
  removeAllNotifications,
  closeNotification,
})(NotificationsView);
