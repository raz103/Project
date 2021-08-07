// testUtils.js
import orm from "../../orm";

export function applyActionToModelReducer(action, modelName, session) {
  return session[modelName].reducer(action, session[modelName], session);
}

export function applyActionAndGetNextSession(action, modelName, session) {
  session[modelName].reducer(action, session[modelName], session);
  return orm.session(session.state);
}
