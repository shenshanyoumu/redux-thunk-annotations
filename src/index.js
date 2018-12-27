/**
 *
 * @param {*} extraArgument 用于给action生成函数提供额外的参数
 */

function createThunkMiddleware(extraArgument) {
  // 注意下面的dispatch其实被中间件增强，而参数next其实就是dispatch
  // 在应用开发中，action函数执行后返回一个thunk函数，该thunk函数接受dispatch作为参数，即相当于next函数
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
