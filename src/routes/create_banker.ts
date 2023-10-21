import express from "express";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.post("/api/banker", async (req, res) => {
  try {
    const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

    const banker = Banker.create({
      first_name: firstName,
      last_name: lastName,
      email,
      card_number: cardNumber,
      employee_number: employeeNumber,
    });

    await banker.save();

    return res.json(banker);
  } catch (error) {
    console.log("Database error: ", error);
    return res.json({
      error: `Error in creating banker. ${error.driverError}`,
    });
  }
});

export { router as createBankerRouter };
