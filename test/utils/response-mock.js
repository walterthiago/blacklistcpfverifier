module.exports = exports = class ResponseMock {
  
  constructor() {
    this.statusCode = 0;
    this.body = {};
  }

  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  json(json) {
    this.body = json;
    return this;
  }

}