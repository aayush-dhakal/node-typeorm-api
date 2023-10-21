import express from "express";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;

  const client = await Client.findOne(parseInt(clientId));

  const banker = await Banker.findOne(parseInt(bankerId));

  if (banker && client) {
    banker.clients = [client]; // we can only add new entry for those entity where we have defined JoinTable so in our code we can we add client to banker and not other way around
    await banker.save();
    return res.json({
      msg: "banker connected to client",
    });
  } else {
    return res.json({
      msg: "banker or client not found",
    });
  }
});

export { router as connectBankerToClientRouter };
