/**
 *
 * @param {*} extraArgument 用于给action生成函数提供额外的参数
 */

function createThunkMiddleware(extraArgument) {

  // 结合redux源码，中间件在applyMiddlewares函数中首先接受{dispatch,getState}参数
  // 注意此时dispatch属性方法:(...args)=>dispatch(...args)，里面的dispatch通过闭包形式
  // 得到一个增强型态；next是通过compose(...middlewares)(store.dispatch)构造的嵌套调用结构
  

  // 当action是普通的对象时，则next就是store.dispatch函数；而当action具有副作用
  // 则通过
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }

    // 洋葱模型，最里层中间件接受参数store.dispatch，然后返回的新函数接受普通的action对象
    // 作为thunk调用的精髓，当内层函数执行完毕具有返回值后，再依次调用外层函数
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
