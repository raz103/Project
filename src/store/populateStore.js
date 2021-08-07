import faker from "faker";
import { createUser } from "./modelDucks/User";
import { createData } from "./modelDucks/Data";

export default function populateStore(store) {
  // add some initial fake data
  for (let i = 1; i <= 100; i++) {
    store.dispatch(createUser({ id: i, name: faker.name.findName() }));
  }
  // store.dispatch(createUser({ id: 1, name: "Frank" }));
  // store.dispatch(createUser({ id: 2, name: "John" }));
  // store.dispatch(createUser({ id: 3, name: "Anne" }));

  store.dispatch(createData({ id: 3, user: 3, age: 20, note: "" }));
}
