const express = require("express");
const contactRoutes = require("./routes/contact");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (!!req.query.break) {
    res.send(`<h1>Zapytanie przerwane! (Powód: ${req.query.break})</h1>`);
    res.end();
  }
  console.log(`Endpoint: ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Dzień dobry, Panie Profesorze!</h1>");
});

// app.get("/contacts?", (req, res) => {
//   const { name } = req.query;
//   res.send(`<h1>Hello, ${name ?? `guest`}!</h1>`);
// });

// app.get("/contacts?/:id", (req, res) => {
//   const { id } = req.params;
//   res.send(`ID użytkownika: [${id}]`);
// });

// app.post("/test", (req, res) => {
//   console.log(req.body);
//   res.json({ status: "Otrzymano zapytanie" });
// });

app.use("/contacts?", contactRoutes);

app.listen(PORT, () => {
  console.log(`Aplikacja została uruchomiona i nasłuchuje na porcie ${PORT}`);
});

// Zasada działania middleware'ów:
// 1. Klient wysyła zapytanie
// 2. Uruchamia się middleware
// 3. Middleware weryfikuje dane
// 4. Middleware decyduje, czy:
//    a) przepuścić zapytanie (-next()),
//    b) przerwać je i wysłać informację do klienta (np. res.send())
