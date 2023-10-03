import ApiError from "../helpers/api-error.js";
import tokenService from "../service/token-service.js";

export default async function (req, res, next) {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return next(ApiError.UnauthErr());
    }
    const accessToken = authHeaders.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthErr());
    }
    const userData = await tokenService.validateAccessToken(accessToken);
    console.log("VALID", userData);
    if (!userData) {
      return next(ApiError.UnauthErr());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthErr());
  }
}
