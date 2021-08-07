import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import { usersSelector } from "../../store/modelDucks/UserSelectors";
import { getDataForUser } from "../../store/modelDucks/DataSelectors";
import {
  toggleSelected,
  putEditing,
  isEditingSelector,
  isSelectedSelector,
  saveData
} from "../../store/slices/dataManagement";
import RenderCounter from "../RenderCounter";

function DataRow({ userId, values, handleChange }) {
  const dispatch = useDispatch();
  const hasRunOnce = useRef(false);

  // selectors
  const user = useSelector((state) => usersSelector(state, userId));
  const data = useSelector((state) => getDataForUser(state, userId))[0];
  const isExplicitlyEditing = useSelector((state) =>
    isEditingSelector(state, userId)
  );
  const isSelected = useSelector((state) => isSelectedSelector(state, userId));
  const isEditing = isExplicitlyEditing || !data;
  const setEditing = useCallback(() => {
    dispatch(putEditing(userId));
  }, [dispatch, userId]);

  const handleCheckboxChange = useCallback(() => {
    dispatch(toggleSelected(userId));
  }, [dispatch, userId]);

  // on initial mount, set to editing if there is no data
  // useEffect(() => {
  //   if (!data && !hasRunOnce.current) {
  //     setEditing();
  //     hasRunOnce.current = true;
  //   }
  // }, [data, setEditing]);

  const editButton = (
    <IconButton onClick={setEditing}>
      <EditIcon />
    </IconButton>
  );

  const saveButton = (
    <IconButton onClick={() => dispatch(saveData(values))}>
      <SaveIcon />
    </IconButton>
  );

  return (
    <TableRow>
      <TableCell>
        <RenderCounter />
      </TableCell>
      <TableCell>
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </TableCell>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            id={`[${userId}].age`}
            variant="outlined"
            label="age"
            size="small"
            value={values?.age}
            onChange={(e) => handleChange(userId, "age", e.target.value)}
          />
        ) : (
          values?.age || "----"
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            id={`[${userId}].note`}
            variant="outlined"
            label="note"
            size="small"
            value={values?.note}
            onChange={(e) => handleChange(userId, "note", e.target.value)}
          />
        ) : (
          values?.note || "----"
        )}
      </TableCell>
      <TableCell>{isEditing ? saveButton : editButton}</TableCell>
    </TableRow>
  );
}

export default React.memo(DataRow);

DataRow.whyDidYouRender = true;
