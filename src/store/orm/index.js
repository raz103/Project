import { ORM, createReducer } from "redux-orm";
import models from "../modelDucks/models";

// Create an ORM instance and hook up the models
const orm = new ORM({ stateSelector: (state) => state.orm });
// useful if importing models as a file
const spreadableModels = Object.values(models);
orm.register(...spreadableModels);

const reducer = createReducer(orm);

export { orm, reducer };
export default orm;
