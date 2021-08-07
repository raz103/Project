import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { alteredUserIdsSelector } from "../store/slices/dataManagement";
import { namesSelector } from "../store/modelDucks/UserSelectors";

function UnsavedChangesDialog({ open, onAccept, onReject }) {
  const alteredUserIds = useSelector((state) => alteredUserIdsSelector(state));

  const sortedAlteredUserIds = [...alteredUserIds].sort();
  const alteredNames = useSelector((state) =>
    namesSelector(state, sortedAlteredUserIds)
  );

  return (
    <Dialog open={open} onClose={onReject}>
      <DialogTitle>Are you sure you wish to do this?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          There are unsaved changes for {alteredNames.join(", ")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReject}>Cancel</Button>
        <Button onClick={onAccept}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UnsavedChangesDialog;
