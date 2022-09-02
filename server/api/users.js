const router = require("express").Router();
const {
  models: { User, Home, Watchlist },
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

router.post("/addWatchlist", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let { id } = req.body;
    const adding = await Home.findByPk(id);
    await user.addHome(adding);
    res.send(await user.getWatchlist());
  } catch (err) {
    next(err);
  }
});

// the error is the id from request is constantly undefined.
// This router works with integer ex) homeId : 1
router.delete("/removeWatchlist", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let data = req.body;
    await Watchlist.destroy({
      where: {
        userId: user.id,
        homeId: data.id,
      },
    });
    res.send(await user.getWatchlist());
  } catch (err) {
    next(err);
  }
});
