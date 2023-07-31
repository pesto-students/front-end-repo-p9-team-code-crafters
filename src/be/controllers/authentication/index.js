import {loginSchema} from "@/be/validators";
import {User} from "@/models";
import {sign, verify} from "jsonwebtoken";

export const loginController = async (request, response) => {
  const {data} = request.body;
  if (!data) response.status(400).end("login data is missing!");
  loginSchema
    .validate(data)
    .then(async (loginData) => {
      const {email, password} = loginData;
      let userData = await User.findOne({email});
      if (!userData) return response.status(400).send("user not found");

      const isPasswordCorrect = password === userData.password;
      if (isPasswordCorrect) {
        const tokenData = {
          name: userData.name,
          email: userData.email,
          contact: userData.contact,
          role: userData.role,
          dob: userData.dob,
          profile_img: userData.profile_img,
          verification_details: userData.verification_details,
          bank_details: userData.bank_details,
          is_user_verified: userData.is_user_verified,
          are_bank_details_verified: userData.are_bank_details_verified,
        };
        const authToken = sign(tokenData, process.env.ACCESS_TOKEN_SALT, {
          expiresIn: "20h",
        });
        return response.status(200).send({data: authToken});
      } else {
        return response.status(400).send("invalid credentials");
      }
    })
    .catch((error) => {
      return response.status(400).send(error.message);
    });
};

export const verifyUserController = async (request, response) => {
  const {data} = request.body;
  if (!data || data === "")
    return response.status(401).end("token is missing!");
  try {
    const userData = verify(data, process.env.ACCESS_TOKEN_SALT);
    return response.status(200).send(userData);
  } catch (error) {
    return error.name === "TokenExpiredError"
      ? response.status(403).send("user session has expired")
      : response.status(401).send("invalid access token");
  }
};
