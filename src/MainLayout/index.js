import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
//LOCAL IMPORTS
import NotificationAlert from "../Shared/AlertMessages/notificationAlert";
import { showNotification } from "../Store/NotificationMessages/actionCreator";
import NotificationsView from "../Components/notifications";

const useStlyes = makeStyles((theme) => ({
  container: {
    fontSize: "14px",
    position: "fixed",
    zIndex: 1,
    bottom: "1rem",
    right: "1rem",
  },
}));

function MainLayout(props) {
  const classes = useStlyes();
  const notificationsList = props && props.alertReducer && props.alertReducer;

  return (
    <React.Fragment>
      <NotificationsView />
      <div className={classes.container}>
        {notificationsList && notificationsList.length ? (
          <React.Fragment>
            {notificationsList.map((data, index) => {
              return <NotificationAlert {...data} key={index} />;
            })}
          </React.Fragment>
        ) : null}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    alertReducer: state.alertReducer.notifications,
  };
};

export default connect(mapStateToProps, { showNotification })(MainLayout);
