import { createAction } from "@reduxjs/toolkit";
import Model, { attr } from "redux-orm";

// =====ACTIONS=====
export const createUser = createAction("models/users/create");
export const deleteUser = createAction("models/users/delete");

// =====MODEL=====
export default class User extends Model {
  static modelName = "User";

  static get fields() {
    return {
      id: attr(),
      name: attr()
    };
  }

  static reducer({ type, payload }, User, session) {
    switch (type) {
      case createUser.type: {
        if (!payload.id || !payload.name) {
          console.warn("Unable to create a user without id or name");
        } else {
          User.upsert(payload);
        }
        break;
      }
      case deleteUser.type: {
        let user = User.withId(payload);
        if (user) {
          user.delete();
        } else {
          console.warn(`No user found with id: ${payload}`);
        }
        break;
      }
      default:
        break;
    }
  }
}
