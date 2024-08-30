const isHexColor = (value) => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(value);
};

module.exports = { isHexColor };
