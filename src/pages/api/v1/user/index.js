import {
  getUsersController,
  updateUserInformationController,
  updateUserVerificationDetailsController,
} from "@/backend/controllers";
import {checkAdmin, checkAuth, connectDB} from "@/backend/middlewares";
import {ncErrorHandlers} from "@/backend/utils";
import {createRouter} from "next-connect";

const router = createRouter();

router
  .use(connectDB)
  .use(checkAuth)
  .patch(updateUserInformationController)
  .put(updateUserVerificationDetailsController)
  .use(checkAdmin)
  .get(getUsersController);

export default router.handler(ncErrorHandlers);
