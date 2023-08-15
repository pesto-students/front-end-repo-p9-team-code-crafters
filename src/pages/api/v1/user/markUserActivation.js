import {markUserActiveController} from "@/backend/controllers";
import {checkAdmin, checkAuth, connectDB} from "@/backend/middlewares";
import {ncErrorHandlers} from "@/backend/utils";
import {createRouter} from "next-connect";

const router = createRouter();

router
  .use(connectDB)
  .use(checkAuth)
  .use(checkAdmin)
  .patch(markUserActiveController);

export default router.handler(ncErrorHandlers);
