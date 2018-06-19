module.exports = exports = class RequestMock {

  constructor(args) {
    args = args || {};

    if (args.query) {
      this.query = args.query;
    }

    if (args.body) {
      this.body = args.body;
    }

  }

}