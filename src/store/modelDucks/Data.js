import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

// =====ACTIONS=====
export const createData = createAction("models/data/create");
export const upsertData = createAction("models/data/upsert");
export const editData = createAction("models/data/edit");
export const deleteData = createAction("models/data/delete");

// =====MODEL=====
export default class Data extends Model {
  static modelName = "Data";

  static get fields() {
    return {
      id: attr(),
      user: fk("User", "data"),
      age: attr(),
      note: attr()
    };
  }

  static reducer({ type, payload }, Data, session) {
    switch (type) {
      case createData.type: {
        Data.create(payload);
        break;
      }
      case upsertData.type: {
        const dataArrays = Array.isArray(payload) ? payload : [payload];
        dataArrays.forEach((data) => {
          const { id, ...rest } = data;
          if (id) {
            Data.upsert(data);
          } else {
            Data.upsert(rest);
          }
        });
        break;
      }
      case editData.type: {
        const { id, age, note } = payload;
        if (id === undefined || id === null) {
          console.warn("Unable to edit a post without id");
        } else {
          const data = Data.withId(id);
          data.age = age ?? data.age;
          data.note = note ?? data.note;
        }
        break;
      }
      case deleteData.type: {
        const id = payload;
        const data = Data.withId(id);
        data.delete();
        break;
      }
      default:
        break;
    }
  }
}
