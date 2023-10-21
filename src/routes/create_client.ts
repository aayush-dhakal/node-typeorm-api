import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/client", async (req, res) => {
  // if you donot put try catch then when there is error from database then the server will be stuck to that error. So we want to handle the exception so that our server can respond with an error and noot be hanged or dead.
  try {
    const { firstName, lastName, email, cardNumber, balance } = req.body;

    const client = Client.create({
      first_name: firstName,
      last_name: lastName,
      email,
      card_number: cardNumber,
      balance,
    });

    await client.save();

    return res.json(client);
  } catch (error) {
    console.log("Database error: ", error);
    return res.json({
      error: `Error in creating client. ${error.driverError}`,
    });
  }
});

export { router as createClientRouter };
