import { createSelector } from "redux-orm";
import orm from "../orm";

// =====SELECTORS=====
// returns all users
export const usersSelector = createSelector(orm.User);

// get userIDs
export const userIdsSelector = createSelector([orm.User], (users) => {
  return users.map((user) => user.id);
});

// returns names for users
export const namesSelector = createSelector(orm.User.name);
