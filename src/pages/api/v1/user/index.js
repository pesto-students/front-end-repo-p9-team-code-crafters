import {
  updateUserInformationController,
  updateUserVerificationDetailsController,
} from "@/backend/controllers";
import {checkAuth, connectDB} from "@/backend/middlewares";
import {ncErrorHandlers} from "@/backend/utils";
import {createRouter} from "next-connect";

const router = createRouter();

router
  .use(connectDB)
  .use(checkAuth)
  .patch(updateUserInformationController)
  .put(updateUserVerificationDetailsController);

export default router.handler(ncErrorHandlers);
