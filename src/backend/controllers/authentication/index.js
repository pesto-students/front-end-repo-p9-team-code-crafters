import {
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "@/backend/validators";
import {ResetToken, User} from "@/models";
import {sign, verify} from "jsonwebtoken";
import bcrypt from "bcrypt";
import {generate32BitCode, getEmailBody} from "@/backend/utils";
import {forgotPasswordEmail} from "@/appData";
import {sendEmail} from "@/backend/services";

export const signupController = async (request, response) => {
  const {data} = request.body;
  if (!data) return response.status(400).end("signup data is missing!");
  signupSchema
    .validate(data)
    .then(async (signupData) => {
      const {email, password, name, dob, contact} = signupData;
      try {
        let userData = await User.findOne({email: email.toLowerCase()});
        if (userData) return response.status(401).send("user already exists!");
        const encryptedPassword = await bcrypt
          .genSalt(Number(process.env.SALT_ROUNDS))
          .then((salt) => {
            return bcrypt.hash(password, salt);
          })
          .then((hash) => {
            return hash;
          });
        const user = new User({
          name,
          email: email.toLowerCase(),
          dob,
          password: encryptedPassword,
          contact,
        });
        await user.save();
        return response.status(200).send("User Signup successfull!!");
      } catch (error) {
        return response.status(500).send(error.message);
      }
    })
    .catch((error) => {
      return response.status(400).send(error.message);
    });
};

export const loginController = async (request, response) => {
  const {data} = request.body;
  if (!data) return response.status(400).end("login data is missing!");
  loginSchema
    .validate(data)
    .then(async (loginData) => {
      const {email, password} = loginData;
      let userData = await User.findOne({email, is_active: true});
      if (!userData) return response.status(400).send("user not found");

      const isPasswordCorrect = await bcrypt.compare(
        password,
        userData.password
      );
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

export const forgotPasswordController = async (request, response) => {
  const {data} = request.body;
  if (!data || !data.email) return response.status(401).end("data is missing!");
  try {
    let userData = await User.findOne({email: data.email, is_active: true});
    if (!userData) return response.status(400).send("user not found");
    let tokenData = {
      user: userData._id,
      code: generate32BitCode(),
    };
    const resetToken = sign(tokenData, process.env.ACCESS_TOKEN_SALT, {
      expiresIn: "24h",
    });

    const token = new ResetToken(tokenData);
    const databaseData = await token.save();
    const emailBody = getEmailBody({
      subject: "Link to Reset Password",
      htmlContent: forgotPasswordEmail,
      messageVersions: [
        {
          to: [
            {
              email: userData.email,
              name: userData.name,
            },
          ],
          params: {
            link:
              process.env.NEXT_PUBLIC_ROOT_API_URL +
              "/resetPassword?token=" +
              resetToken,
          },
        },
      ],
    });
    if (databaseData) {
      await sendEmail(emailBody);
    } else {
      return response
        .status(500)
        .send("Something went wrong!! please try again in sometime!");
    }
    return response.status(200).send("Email for resetting password sent!");
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const verifyResetTokenController = async (request, response) => {
  const {data} = request.body;
  if (!data || data === "")
    return response.status(401).end("token is missing!");
  try {
    const tokenData = verify(data, process.env.ACCESS_TOKEN_SALT);
    try {
      const token = await ResetToken.findOne({code: tokenData.code});
      return token
        ? response.status(200).send(tokenData)
        : response.status(400).send("invalid token");
    } catch (error) {
      return response.status(500).send(error.message);
    }
  } catch {
    return response.status(400).send("invalid token data");
  }
};

export const deleteResetTokenController = async (_request, response) => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  try {
    await ResetToken.deleteMany({createdAt: {$lt: twentyFourHoursAgo}});
  } catch {
    return response.status(400).send("invalid token data");
  }
};

export const resetPasswordController = async (request, response) => {
  const {data} = request.body;
  if (!data) return response.status(400).end("data is missing!");
  resetPasswordSchema
    .validate(data)
    .then(async (resetPasswordData) => {
      const {user, password, code} = resetPasswordData;
      const encryptedPassword = await bcrypt
        .genSalt(Number(process.env.SALT_ROUNDS))
        .then((salt) => {
          return bcrypt.hash(password, salt);
        })
        .then((hash) => {
          return hash;
        });
      try {
        await User.findByIdAndUpdate(
          user,
          {
            password: encryptedPassword,
          },
          {returnDocument: "after"}
        );
        await ResetToken.findOneAndDelete({code});
        return response.status(200).send("Password has been updated!");
      } catch (error) {
        return response.status(500).send(error.message);
      }
    })
    .catch((error) => {
      return response.status(400).send(error.message);
    });
};
