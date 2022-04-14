module.exports = (result, isError, message) => {
  return {
    result: result,
    error: isError,
    message: message,
  };
};
