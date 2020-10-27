module.exports = function (app) {

    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.use("/api/v1/payment", require("./payment.routes"));
app.use("/api/v1/authentication", require("./authentication.routes"));
app.use("/api/v1/payment", require("./payment.routes"));
}
