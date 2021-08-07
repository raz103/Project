import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DataTable from "./components/DataTable";
import ErrorMessage from "./components/ErrorMessage";
import ThemeWrapper from "./components/ThemeWrapper";
import { alteredUserIdsSelector } from "./store/slices/dataManagement";
import UnsavedChangesDialog from "./components/UnsavedChangesDialog";

const App = () => {
  const [shouldShow, setShouldShow] = useState(true);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const alteredUserIds = useSelector(alteredUserIdsSelector);

  const handleToggleTable = useCallback(() => {
    if (!shouldShow) {
      setShouldShow(true);
    } else {
      if (alteredUserIds.length > 0) {
        setShowConfirmationDialog(true);
      } else {
        setShouldShow(false);
      }
    }
  }, [shouldShow, alteredUserIds]);

  function handleAcceptDialog() {
    setShouldShow(false); // this will unmount the table
    setShowConfirmationDialog(false);
  }

  function handleRejectDialog() {
    // don't unmount the table when rejected
    setShowConfirmationDialog(false);
  }

  return (
    <div data-testid="App" className="App">
      <ThemeWrapper>
        <UnsavedChangesDialog
          open={showConfirmationDialog}
          onAccept={handleAcceptDialog}
          onReject={handleRejectDialog}
        />
        <Typography variant="h4" gutterBottom>
          Some Data Table
        </Typography>
        <Button variant="contained" onClick={handleToggleTable}>
          Toggle table
        </Button>
        <Divider
          variant="middle"
          style={{ marginTop: "1em", marginBottom: "1em" }}
        />
        {shouldShow && <DataTable />}
        <ErrorMessage />
      </ThemeWrapper>
    </div>
  );
};

export default App;
