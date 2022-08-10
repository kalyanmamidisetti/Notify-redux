import React, { useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { connect } from "react-redux";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
//LOCAL IMPORTS
//import { closeSnackBar } from "../../Store/AlertMessages/actionCreator";

//FOR SLIDE TRANSITION
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

//FOR ALERT
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBarAlerts(props) {
  const state = {
    open: props.state,
    vertical: "bottom",
    horizontal: "right",
  };
  const { vertical, horizontal } = state;

  const handleClose = useCallback(() => {
    // props.closeSnackBar(props.key);
  }, []);

  return (
    <React.Fragment>
      {props && props.type !== "normal" ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={props.state}
          autoHideDuration={props.timeout ? props.timeout : 2000}
          onClose={handleClose}
          TransitionComponent={SlideTransition}
        >
          <Alert
            onClose={handleClose}
            severity={props.type}
            sx={{ width: "100%" }}
          >
            {props.message}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={props.state}
          autoHideDuration={props.timeout ? props.timeout : 2000}
          onClose={handleClose}
          message={props.message}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    alertReducer: state.alertReducer,
  };
};

export default connect(mapStateToProps, {})(SnackBarAlerts);
