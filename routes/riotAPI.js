const express = require("express");
const router = express.Router();

const leagueapiwrapper = require("leagueapiwrapper");
const LeagueAPI = new leagueapiwrapper(process.env.RIOT_LOL_API_KEY, Region.NA);

router.get("/get-summoner", (req, res) => {
  console.log(req.query.name);
  LeagueAPI.getSummonerByName(req.query.name)
    .then((accountObject) => {
      return LeagueAPI.getMatchList(accountObject);
    })
    .then((matchHistory) => {
      res.send(matchHistory); 
    })
    .catch(console.error);
});

module.exports = router;
