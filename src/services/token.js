const jsonwebtoken = require("jsonwebtoken");

const jwt = {

  /*
   * @name issueJWT
   * @description token has been generated from here
   */

  issueJWT: async (user) => {
    let payload = {
      id: user.id,
      email: user.email,
    };
    console.log(user,"...........user")
    console.log(payload,".......payload")
    const options = {
      expiresIn: "365d",
    };
    const jwtToken = await jsonwebtoken.sign(payload, "KEy", options);
    return jwtToken;
  },

  /*
   * @name verifyTokenFn
   * @description token has been verified from here
   */

  verifyTokenFn: async (req, res, next) => {
    let token = req.headers.authorization;
    await jsonwebtoken.verify(token, "KEy", function (err, decoded) {
      if (err) {
        return res.json({
          status: false,
          statusCode: false,
          message: "Token not found",
        });
      } else {
        req.user = {
          id: decoded.id,
          email: decoded.email,
        };
        return next();
      }
    });
  },
};
module.exports = jwt;