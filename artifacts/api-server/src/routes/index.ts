import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import affiliatesRouter from "./affiliates";
import blogRouter from "./blog";
import printQuoteRouter from "./printQuote";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(affiliatesRouter);
router.use(blogRouter);
router.use(printQuoteRouter);

export default router;
