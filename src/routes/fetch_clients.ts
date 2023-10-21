import express from "express";
import { Banker } from "../entities/Banker";
import { createQueryBuilder } from "typeorm";
import { Client } from "../entities/Client";

const router = express.Router();

router.get("/api/bankers", async (req, res) => {
  // gets all the client
  // const client = await Client.find();
  // return res.json(client);

  // const bankers = await createQueryBuilder(
  // 	'banker'
  // )
  // 	.where('id = :bankerId', { bankerId: 2 })
  // 	.getOne();

  // const clients = await createQueryBuilder(
  // 	'client'
  // )
  // 	.select('client')
  // 	.from(Client, 'client')
  // 	.leftJoinAndSelect(
  // 		'client.transactions',
  // 		'transaction'
  // 	)
  // 	.where('client.id = :clientId', {
  // 		clientId: 3,
  // 	})
  // 	.getOne();

  const clients = await createQueryBuilder("client")
    // .select("client") // this will select everything
    .select("client.first_name")
    .addSelect("client.last_name")
    .from(Client, "client") // table name
    .leftJoinAndSelect("client.transactions", "transaction") // this will populate the transaction by automatically matching the ids
    .where("client.id = :clientId", {
      clientId: 1, // you can get the client id from req query or body
    })
    // .where("client.balanace >= :minBalance AND client.balance <= :maxBalance", {
    //   minBalance: 40000,
    //   maxBalance: 60000,
    // })
    // .getMany();
    .getOne();

  console.log({ clients });

  return res.json(clients);
});

export { router as fetchClientsRouter };
