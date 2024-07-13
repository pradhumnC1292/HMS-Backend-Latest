export const catchAsyncErrors = (asyncRouteHandler) => {
  return (req, res, next) => {
    Promise.resolve(asyncRouteHandler(req, res, next)).catch(next);
  };
};
