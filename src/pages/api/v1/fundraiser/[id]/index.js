import {
  deleteFundraiserController,
  editFundraiserController,
  getFundraiserByIdController,
} from "@/backend/controllers";
import {checkAuth, connectDB} from "@/backend/middlewares";
import {ncErrorHandlers} from "@/backend/utils";
import {createRouter} from "next-connect";

const router = createRouter();

router
  .use(connectDB)
  .get(getFundraiserByIdController)
  .use(checkAuth)
  .put(editFundraiserController)
  .delete(deleteFundraiserController);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler(ncErrorHandlers);
