import {loginController} from "@/backend/controllers";
import {connectDB} from "@/backend/middlewares";
import {ncErrorHandlers} from "@/backend/utils";
import {createRouter} from "next-connect";

const router = createRouter();

router.use(connectDB).post(loginController);

export default router.handler(ncErrorHandlers);
