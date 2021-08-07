import React, { useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useLocalSlice } from "use-local-slice";
import { AutoSizer, Column, Table as RVTable } from "react-virtualized";
import {
  putSelected,
  clearSelected,
  selectedUserIdsSelector,
  saveData,
  putAltered,
  putDefaults
} from "../../store/slices/dataManagement";
import { userIdsSelector } from "../../store/modelDucks/UserSelectors";
import DataRow from "./DataRow";
import { dataSelector } from "../../store/modelDucks/DataSelectors";

const useStyles = makeStyles((theme) => {
  const isDark = theme.palette.type === "dark";

  return {
    tableContainer: {
      marginTop: "1em"
    },
    tableHeaderCell: {
      backgroundColor: isDark ? "gray" : "lightgray"
    }
  };
});

function isShallowEqualUnordered(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item1) => arr2.includes(item1));
}

// COMPONENT
function DataTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const allUserIds = useSelector(userIdsSelector);
  const selectedUserIds = useSelector(selectedUserIdsSelector);

  const allData = useSelector(dataSelector);

  const resetToDefaults = useCallback(() => {
    dispatch(putDefaults());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      resetToDefaults();
    };
  }, [resetToDefaults]);

  const initialState = useMemo(() => {
    const values = {};
    allUserIds.forEach((userId) => {
      values[userId] = {
        id: null,
        user: userId,
        age: "",
        note: ""
      };
    });

    allData.forEach((dataOb) => {
      values[dataOb.user] = {
        id: dataOb.id,
        user: dataOb.user,
        age: dataOb.age,
        note: dataOb.note
      };
    });

    return {
      values,
      changedIds: []
    };
  }, [allUserIds, allData]);

  const [formState, dispatchAction] = useLocalSlice({
    slice: "formSlice",
    initialState,
    reducers: {
      update: (state, { payload }) => {
        state.values[payload.userId][payload.fieldName] = payload.value;
      }
    }
  });

  const handleChange = useCallback(
    (userId, fieldName, value) => {
      dispatchAction.update({ userId, fieldName, value });
      dispatch(putAltered(userId));
    },
    [dispatch, dispatchAction]
  );

  const areAllSelected = useMemo(() => {
    return isShallowEqualUnordered(allUserIds, selectedUserIds);
  }, [allUserIds, selectedUserIds]);

  const handleCheckboxChange = useCallback(() => {
    if (areAllSelected) {
      dispatch(clearSelected());
    } else {
      dispatch(putSelected(allUserIds));
    }
  }, [dispatch, areAllSelected, allUserIds]);

  const handleSaveSelected = useCallback(() => {
    if (selectedUserIds.length === 0) {
      console.warn("no entries selected!");
      return;
    }
    const selectedDataArray = selectedUserIds.map(
      (userId) => formState.values[userId]
    );

    dispatch(saveData(selectedDataArray));
  }, [dispatch, selectedUserIds, formState.values]);

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={handleSaveSelected}>
        Save all selected
      </Button>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Renders</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                <Checkbox
                  checked={areAllSelected}
                  onChange={handleCheckboxChange}
                />
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>ID</TableCell>
              <TableCell className={classes.tableHeaderCell}>Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Age</TableCell>
              <TableCell className={classes.tableHeaderCell}>Note</TableCell>
              <TableCell className={classes.tableHeaderCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUserIds.map((userId) => (
              <DataRow
                key={userId}
                userId={userId}
                values={formState.values[userId]}
                handleChange={handleChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default React.memo(DataTable);
