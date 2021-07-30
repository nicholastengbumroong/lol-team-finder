const express = require("express");
const router = express.Router();

const LeagueJS = require("leaguejs");
const leaguejs = new LeagueJS(process.env.RIOT_LOL_API_KEY);


router.get("/get-summoner-details", (req, res) => {
  console.log(req.query.name);
  accountDetails = {accountObj: null, rankObj: null, matchHistory: []};
  
  leaguejs.Summoner.gettingByName(req.query.name)
    .then((accountObj) => {
        accountDetails.accountObj = accountObj; 
        leaguejs.League.gettingLeagueEntriesForSummonerId(accountObj.id)
          .then((rankObj) => {
            accountDetails.rankObj = rankObj.find(queueObj => queueObj.queueType === 'RANKED_SOLO_5x5'); 
          }); 
        return leaguejs.Match.gettingListByAccount(accountObj.accountId, {queue: 420, season: 13, endIndex: 3});
    })
    .then((matchHistoryObj) => {
      let matchPromiseArr = []; 
      for (let i = 0; i < matchHistoryObj.endIndex; i++) {
        matchPromiseArr.push(leaguejs.Match.gettingById(matchHistoryObj.matches[i].gameId));
      }
      Promise.all(matchPromiseArr)
        .then((matchList) => {
          accountDetails.matchHistory = matchList; 
          res.send(accountDetails); 
        })
        .catch(console.error); 
    })
    .catch(console.error); 
});

router.get("/get-account-info", (req, res) => {
  console.log(req.query.name);
  leaguejs.Summoner.gettingByName(req.query.name)
    .then(() => {
      return LeagueAPI.getSummonerByName(req.query.name);
    })
    .then((accountInfo) => {
      //console.log(accountInfo); 
      res.send({
        profileIconObj: accountInfo.profileIconObject,
        summonerLevel: accountInfo.summonerLevel
      }); 
    })
    .catch(console.error);
});


module.exports = router;
