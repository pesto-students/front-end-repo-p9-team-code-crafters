import {
  deleteFundraiserController,
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
  .delete(deleteFundraiserController);

export default router.handler(ncErrorHandlers);
