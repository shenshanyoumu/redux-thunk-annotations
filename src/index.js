/**
 *
 * @param {*} extraArgument 用于给action生成函数提供额外的参数
 */

function createThunkMiddleware(extraArgument) {
  // 注意下面的dispatch其实被中间件增强
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }

    // next其实也是一个变种的dispatch函数，经过composed的函数在执行时内部函数执行返回next
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
