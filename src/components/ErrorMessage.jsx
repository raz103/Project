import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { clearError } from "../store/slices/error";

// TODO: consider this a 'warning', not error since it autohides
export default function ErrorMessage() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.error);

  const dispatchClearError = () => dispatch(clearError());

  return (
    <Snackbar
      open={!!errorMessage}
      autoHideDuration={3000}
      onClose={dispatchClearError}
    >
      <Alert onClose={dispatchClearError} severity="warning">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
