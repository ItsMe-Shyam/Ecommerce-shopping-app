
module.exports =  (asyncErrorHandler) => (req, res, next) => {
    Promise.resolve(asyncErrorHandler(req, res, next)).catch(next);
}
