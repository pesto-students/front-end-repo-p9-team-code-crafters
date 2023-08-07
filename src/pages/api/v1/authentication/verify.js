import {verifyUserController} from "@/backend/controllers";
import {connectDB} from "@/backend/middlewares";
import {ncErrorHandlers} from "@/backend/utils";
import {createRouter} from "next-connect";

const router = createRouter();

router.use(connectDB).post(verifyUserController);

export default router.handler(ncErrorHandlers);
