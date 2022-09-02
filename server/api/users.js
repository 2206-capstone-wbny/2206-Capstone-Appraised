const router = require("express").Router();
const {
  models: { User, Home },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/watchlist", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const watchlist = await user.getWatchlist();
    res.send(watchlist);
  } catch (err) {
    next(err);
  }
});

router.put("/addWatchlist", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let { house } = req.body;
    let adding = await Home.findByPk(house.id);
    await user.addHome(adding);
    const watchlist = await user.getWatchlist();
    res.send(watchlist);
  } catch (err) {
    next(err);
  }
});

router.put("/removeWatchlist", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let { house } = req.body;
    let removing = await Home.findByPk(house.id);
    await user.removeHome(removing);
    const watchlist = await user.getWatchlist();
    res.send(watchlist);
  } catch (err) {
    next(err);
  }
});
