import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
//LOCAL IMPORTS
import { closeNotification } from "../../Store/NotificationMessages/actionCreator";

const variantIcon = {
  success: CheckCircleOutlineOutlinedIcon,
  error: ErrorOutlineOutlinedIcon,
  info: InfoOutlinedIcon,
  warning: CancelOutlinedIcon,
};

const useStyles = makeStyles((theme) => ({
  mainWrap: {
    marginBottom: "1rem",
    borderRadius: "4px",
    boxShadow: "0 0 10px #999",
    opacity: 0.9,
    // transition: ".3s ease",
    padding: "12px 16px 12px 16px",
    lineHeight: 1.57143,
  },
  success: {
    color: "#fff",
    backgroundColor: "#37b400",
  },
  error: {
    color: "#fff",
    backgroundColor: "#f31700",
  },
  warning: {
    color: "#000000",
    backgroundColor: "#ffc000",
  },
  info: {
    color: "#fff",
    backgroundColor: "#0058e9",
  },
  normal: {
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  btnWrap: {
    float: "right",
    marginTop: "-8px",
  },
  title: {
    fontWeight: "bold",
    fontSize: "16px",
    textAlign: "left",
    marginTop: "0px",
    marginBottom: "6px",
    height: "18px",
  },
  icon: {
    fontSize: "22px",
    verticalAlign: "-5px",
    marginRight: "12px",
    display: "flex",
    marginTop: "2px",
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: "10px",
  },
}));

function NotificationAlert(props) {
  const classes = useStyles();
  const Icon = variantIcon[props.type];

  useEffect(() => {
    const interval = setInterval(() => {
      if (props && props.timeout) {
        props.closeNotification({
          id: props.id,
        });
      }
    }, props.timeout);
    return () => {
      clearInterval(interval);
    };
  }, [props, props.timeout]);

  //ON CLOSING THE SINGLE NOTIFICATION
  const onCloseSnackBarClick = () => {
    props.closeNotification({
      id: props.id,
    });
  };

  return (
    <div
      key={props.key}
      className={`${classes.mainWrap} ${clsx(classes[props.type])}`}
    >
      <IconButton
        className={classes.btnWrap}
        onClick={() => {
          onCloseSnackBarClick();
        }}
      >
        <CloseIcon className={clsx(classes[props.type])} />
      </IconButton>
      <div style={{ display: "flex" }}>
        {props.type !== "normal" ? (
          <Icon className={`${clsx(classes.icon, classes.iconVariant)}`} />
        ) : null}
        <Typography className={classes.title}>
          {props && props.message}
        </Typography>
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, { closeNotification })(
  NotificationAlert
);
