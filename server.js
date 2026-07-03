const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// serve frontend
app.use(express.static(__dirname));

/* =========================
   DATABASE CONNECTION
========================= */
mongoose.connect("mongodb://salonibhakte_db_user:5ntHsoh32yNS5qr7@ac-qf7exfi-shard-00-00.utlj2ir.mongodb.net:27017,ac-qf7exfi-shard-00-01.utlj2ir.mongodb.net:27017,ac-qf7exfi-shard-00-02.utlj2ir.mongodb.net:27017/?ssl=true&replicaSet=atlas-2ycw7u-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* =========================
   MONGOOSE MODEL
========================= */
const auctionSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  highestBid: Number,
  bidder: String,
  endTime: Number
});

const Auction = mongoose.model("Auction", auctionSchema);

/* =========================
   INITIAL DATA
========================= */
const baseAuctions = [
  {
    id: 1,
    name: "Vintage Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    highestBid: 1200,
    bidder: "None",
    days: 2
  },
  {
    id: 2,
    name: "Gaming Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    highestBid: 50000,
    bidder: "None",
    days: 3
  },
  {
    id: 3,
    name: "Smartphone",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    highestBid: 20000,
    bidder: "None",
    days: 2
  }
];

const daysToMs = (d) => d * 24 * 60 * 60 * 1000;

let auctions = [];

/* =========================
   LOAD FROM DB
========================= */
async function initDB() {
  const data = await Auction.find();

  if (data.length === 0) {
    auctions = baseAuctions.map(a => ({
      ...a,
      endTime: Date.now() + daysToMs(a.days)
    }));

    await Auction.insertMany(auctions);
  } else {
    auctions = data;
  }
}

initDB();

/* =========================
   SOCKET LOGIC
========================= */
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("init", auctions);

  socket.on("placeBid", async (data) => {
    const item = auctions.find(a => a.id === data.id);
    if (!item) return;

    if (Date.now() > item.endTime) return;

    if (data.bid > item.highestBid) {
      item.highestBid = data.bid;
      item.bidder = data.name;

      await Auction.updateOne(
        { id: data.id },
        { highestBid: data.bid, bidder: data.name }
      );

      io.emit("update", item);
    }
  });

  // RESET AUCTION
  socket.on("reset", async () => {
    await Auction.deleteMany({});

    auctions = baseAuctions.map(a => ({
      ...a,
      endTime: Date.now() + daysToMs(a.days)
    }));

    await Auction.insertMany(auctions);

    io.emit("init", auctions);
  });
});

/* =========================
   TIMER UPDATE
========================= */
setInterval(() => {
  io.emit("tick", auctions.map(a => ({
    id: a.id,
    endTime: a.endTime,
    highestBid: a.highestBid,
    bidder: a.bidder
  })));
}, 1000);

/* =========================
   START SERVER
========================= */
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});