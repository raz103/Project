import { createSelector } from "redux-orm";
import orm from "../orm";

// DATA FOR GIVEN ID - SELECTOR CONSTRUCTOR
// (seems to be ideal like this, one selector per item)

// used to create a separate selector per component for optimal memoization
export const makeGetDataById = (id) => {
  return createSelector([orm], (session) => {
    // console.log("selecting for id: ", id);
    const data = session.Data.withId(id);
    if (!data) return {};
    return {
      id: data.id,
      userId: data.user.id,
      age: data.age,
      note: data.note
    };
  });
};

export const dataSelector = createSelector(orm.Data);

export const getDataForUser = createSelector(orm.User.data);


// note being used. above does a better job for most scenarios
export const makeGetDataForUser = (id) => {
  return createSelector([orm], (session) => {
    const allData = session.Data.all().toRefArray();
    const userData = allData.find((data) => data.user === id);
    return userData || {};
  });
};
