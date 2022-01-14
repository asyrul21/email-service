const toBuffer = (data) => {
  return Buffer.from(JSON.stringify(data));
};

module.exports = { toBuffer };
