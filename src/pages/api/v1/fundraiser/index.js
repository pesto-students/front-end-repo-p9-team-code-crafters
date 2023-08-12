import {
  createFundraiserController,
  getFundraiserListController,
} from "@/backend/controllers";
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
  .get(getFundraiserListController)
  .use(checkAuth)
  .use(checkUserBankdetails)
  .post(createFundraiserController);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler(ncErrorHandlers);
