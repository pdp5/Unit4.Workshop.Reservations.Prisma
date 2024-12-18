const express = require("express");
const app = express();
const prisma = require("./prisma");
const PORT = 3000;

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/api/customers", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    console.log("Error while getting all customers ", error);
    next(error);
  }
});
app.get("/api/restaurants", async (req, res, next) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    console.log("Error while gettting restaurants ", error);
    next(error);
  }
});
app.get("/api/reservations", async (req, res, next) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations);
  } catch (error) {
    console.log("Error while getting reservations ", error);
    next(error);
  }
});
app.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
    const customerId = +req.params.id;
    const restaurantId = customerId;
    const { date, partyCount } = req.body;
    console.log("customer id: ", customerId);
    console.log("date ", date);
    console.log("party count: ", partyCount);
    const reservation = await prisma.reservation.create({
      data: {
        date,
        partyCount,
        customerId,
        restaurantId,
      },
    });
    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/customers/reservations/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const deleteReservation = await prisma.reservation.findFirst({
      where: { id },
    });
    if (deleteReservation) {
      await prisma.reservation.delete({ where: { id } });
      return res.json(deleteReservation);
    }
  } catch (error) {
    console.log("Error while deleting a reservation ", error);
    next(error);
  }
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
