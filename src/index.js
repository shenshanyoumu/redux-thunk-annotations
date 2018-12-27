/**
 *
 * @param {*} extraArgument 用于给action生成函数提供额外的参数
 */

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }

    // redux中间件的“洋葱结构”，传递给下一个中间件。当action在所有中间件流动后，会通过原始的store.dispatch触发
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
