module.exports = (condition, response, msg) => {
  if (condition) {
    msg.reply(response);
    return false;
  } else {
    return true;
  }
};
