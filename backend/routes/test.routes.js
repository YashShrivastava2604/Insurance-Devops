import express from "express";

const router = express.Router();

router.get("/", async (req, res)=>{
    return "testroutes/get/ : Working";
});

export default router;