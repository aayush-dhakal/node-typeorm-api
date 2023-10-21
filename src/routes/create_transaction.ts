import express from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionType } from "../entities/Transaction";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {
  try {
    const { clientId } = req.params;

    const { type, amount } = req.body;

    const client = await Client.findOne(parseInt(clientId)); // if no client is found then this will return null so we have to handle that as returning a null will not throw an exception so the execution will not go to catch block

    if (!client) {
      return res.status(404).json({
        msg: "client not found",
      });
    }

    const transaction = await Transaction.create({
      amount,
      type,
      client, // here we have to use the client(name defined to use by typeorm) instead of client_id(the column name defined in actual table)
    });

    await transaction.save();

    // modifying the balance amount of the client
    if (type === TransactionType.DEPOSIT) {
      client.balance = client.balance + amount;
      client.transactions = [transaction];
    } else if (type === TransactionType.WITHDRAW) {
      client.balance = client.balance - amount;
      client.transactions = [transaction];
    }

    await client.save();

    return res.json(client);
  } catch (error) {
    console.log("Database error: ", error);
    return res.json({
      error: `Error in creating transaction. ${error.driverError}`,
    });
  }
});

export { router as createTransactionRouter };
