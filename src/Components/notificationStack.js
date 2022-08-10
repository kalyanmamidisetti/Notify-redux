import React, { useState } from "react";
import { connect } from "react-redux";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
//LOCAL IMPORTS
import { showSnackBar } from "../Store/AlertMessages/actionCreator";
import AddNotificationForm from "./addNotificationForm";

const useStlyes = makeStyles((theme) => ({
  mainWrap: {
    border: "2px solid #707070",
    marginTop: "20px",
    minHeight: "500px",
    borderRadius: "20px",
  },
  divWrap: {
    display: "flex",
  },
  dividerWrap: {
    height: "1px",
    borderWidth: 0,
    marginBottom: "20px",
    color: "#707070",
    backgroundColor: "#707070",
  },
  btnWrap: {
    color: "#ffffff",
    textTransform: "none",
    margin: "20px",
    float: "right",
  },
  titleWrap: {
    fontSize: "22px",
    color: "#2e8eec",
    textAlign: "center",
    padding: "14px",
    fontWeight: "bold",
    flex: 1,
  },
}));

function NotificationStack(props) {
  const classes = useStlyes();
  const [showAddForm, setShowAddForm] = useState(false);

  //ON ADDING NEW NOTIFICATION CLICK
  const addNewNotifyClick = () => {
    setShowAddForm(true);
  };

  //ON CLOSE NEW NOTIFICATION CLICK
  const closeNotifyForm = () => {
    setShowAddForm(false);
  };

  return (
    <Container className={classes.mainWrap}>
      <div className={classes.divWrap}>
        <Typography className={classes.titleWrap}>
          Notifications Stack
        </Typography>
        <Button
          variant="contained"
          className={classes.btnWrap}
          startIcon={<AddIcon />}
          disabled={showAddForm}
          onClick={() => {
            addNewNotifyClick();
          }}
        >
          Notification
        </Button>
      </div>
      <Divider className={classes.dividerWrap} />
      {showAddForm ? (
        <AddNotificationForm closeNotifyForm={closeNotifyForm} />
      ) : null}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { showSnackBar })(NotificationStack);
