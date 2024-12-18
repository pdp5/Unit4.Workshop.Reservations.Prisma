const prisma = require("../prisma");
const seed = async () => {
  const createCustomers = async () => {
    const customers = [{ name: "Prit" }, { name: "Mansi" }, { name: "Aditi" }];
    await prisma.Customer.createMany({ data: customers });
  };

  const CreateRestaurants = async () => {
    const restaurants = [
      { name: "Delhi Darbar" },
      { name: "Fountain" },
      { name: "Western" },
    ];
    await prisma.Restaurant.createMany({ data: restaurants });
  };

  const createReservations = async () => {
    const reservations = [
      {
        date: new Date(),
        partyCount: 1,
        restaurantId: 1,
        customerId: 1,
      },
      { date: new Date(), partyCount: 1, restaurantId: 2, customerId: 2 },
      { date: new Date(), partyCount: 1, restaurantId: 3, customerId: 3 },
    ];
    await prisma.Reservation.createMany({ data: reservations });
  };

  await createCustomers();
  await CreateRestaurants();
  await createReservations();
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
