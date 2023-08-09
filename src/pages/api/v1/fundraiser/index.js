import {createFundraiserController} from "@/backend/controllers";
import {
  checkAuth,
  checkUserBankdetails,
  connectDB,
} from "@/backend/middlewares";
import {ncErrorHandlers} from "@/backend/utils";
import {createRouter} from "next-connect";

const router = createRouter();

router
  .use(connectDB)
  .use(checkAuth)
  .use(checkUserBankdetails)
  .post(createFundraiserController);

export default router.handler(ncErrorHandlers);
