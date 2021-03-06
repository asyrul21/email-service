const shouldBeAnErrorObject = (item) => {
  console.log("ERROR MESSAGE:", item.message);
  item.should.have.property("message");
  item.should.have.property("stack");
};

const isErrorResponse = (res) => {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
  if (res.status === 404 || res.status === 500) {
    return true;
  } else if (res.status === 201 && res.body.message) {
    console.log(res.body);
    return true;
  } else if (res.status === 200 && res.body.message) {
    return true;
  } else {
    return false;
  }
};

const assertInternalError = (response) => {
  if (isErrorResponse(response)) {
    console.log("INTERNAL ERROR STATUS:", response.status);
    console.log("INTERNAL ERROR MESSAGE:", response.body.message);
    console.log("INTERNAL ERROR STACK:", response.body.stack);
  }
  isErrorResponse(response).should.equal(false);
};

const isSuccessData = (item) => {
  item.should.have.property("status");
  // item.should.have.property("messageId");
  // item.should.have.property("messageUrl");
  // item.should.have.property("emailInfo");
};

module.exports = {
  shouldBeAnErrorObject,
  assertInternalError,
  isSuccessData,
};
