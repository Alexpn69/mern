import User from "../models/user.js";
import bcrypt from "bcrypt";
import tokenService from "./token-service.js";
import UserDTO from "../userDTO.js";
import ApiError from "../helpers/api-error.js";

class UserService {
  async signUp(email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadReq(`User with ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 9);
    const user = await User.create({
      email,
      password: hashPassword,
    });
    const userDto = new UserDTO(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    return {
      ...tokens,
      user: userDto,
    };
  }


  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadReq("There isnt user with such email");
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadReq("Password is incorrect");
    }
    const userDto = new UserDTO(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    return {
      ...tokens,
      user: userDto,
    };
  }

}

export default new UserService();
