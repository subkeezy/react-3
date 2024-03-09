export const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  console.log("before action", store.getState());

  let result = next(action);

  console.log("after", store.getState());

  return result;
};
