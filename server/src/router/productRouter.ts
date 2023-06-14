import { Router } from "express";
import {
  countItemHandler,
  getAllItemHandler,
  insertItemHandler,
  clearItemHandler,
  deleteItemHandler,
  infiniteScrollItemHandler,
  paginateItemHandler,
  seedItemHandler,
  updateItemHandler,
  getItemHandler,
} from "../handler";

const router = Router();

router.get("/", getAllItemHandler);
router.post("/", insertItemHandler);
router.put("/", updateItemHandler);
router.delete("/", deleteItemHandler);

router.get("/count", countItemHandler);

router.get("/:id", getItemHandler);

router.post("/paginate", paginateItemHandler);
router.post("/infinite", infiniteScrollItemHandler);
router.post("/seed", seedItemHandler);

router.delete("/clear", clearItemHandler);

export default router;
