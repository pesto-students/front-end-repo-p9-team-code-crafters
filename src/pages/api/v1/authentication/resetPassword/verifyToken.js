import {
  deleteResetTokenController,
  verifyResetTokenController,
} from "@/backend/controllers";
import {checkAdmin, checkAuth, connectDB} from "@/backend/middlewares";
import {ncErrorHandlers} from "@/backend/utils";
import {createRouter} from "next-connect";

const router = createRouter();

router
  .use(connectDB)
  .post(verifyResetTokenController)
  .use(checkAuth)
  .use(checkAdmin)
  .delete(deleteResetTokenController);

export default router.handler(ncErrorHandlers);
