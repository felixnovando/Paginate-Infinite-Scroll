import { Router } from "express";
import {
  countItem,
  getAllItem,
  insertItem,
  clearItem,
  deleteItem,
  infiniteScrollItem,
  paginateItem,
  seedItem,
  updateItem,
} from "../handler";

const router = Router();

router.get("/", getAllItem);
router.post("/", insertItem);
router.put("/", updateItem);
router.delete("/", deleteItem);

router.get("/count", countItem);

router.post("/paginate", paginateItem);
router.post("/infinite", infiniteScrollItem);
router.post("/seed", seedItem);

router.delete("/clear", clearItem);

export default router;