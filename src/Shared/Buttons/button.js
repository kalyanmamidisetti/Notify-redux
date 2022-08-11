import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStlyes = makeStyles((theme) => ({
  btnWrapper: {
    borderRadius: "10px",
    color: "#2e8eec",
    marginRight: "20px",
  },
}));

function ButtonCustom(props) {
  const classes = useStlyes();
  return (
    <Button
      className={classes.btnWrapper}
      onClick={props.onClick}
      variant={props.variant ? props.variant : "outlined"}
      disabled={props.disabled}
    >
      {props.label}
    </Button>
  );
}

export default ButtonCustom;
