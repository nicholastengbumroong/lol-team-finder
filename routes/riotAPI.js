const express = require("express");
const router = express.Router();

const LeagueJS = require("leaguejs");
const leaguejs = new LeagueJS(process.env.RIOT_LOL_API_KEY);
const DataDragonHelper = require('leaguejs/lib/DataDragon/DataDragonHelper');


router.get("/get-summoner-details", (req, res) => {
  console.log(req.query.name);
  accountDetails = {
    accountObj: {}, 
    rankObj: {}, 
    matchHistory: []
  };
  
  leaguejs.Summoner.gettingByName(req.query.name)
    .then((accountObj) => {
        accountDetails.accountObj = accountObj; 
        leaguejs.League.gettingLeagueEntriesForSummonerId(accountObj.id)
          .then((rankObj) => {
            accountDetails.rankObj = (rankObj.find(queueObj => queueObj.queueType === 'RANKED_SOLO_5x5') === undefined) ? 
              {tier: 'UNRANKED', rank: '', wins: 0, losses: 0} :
              rankObj.find(queueObj => queueObj.queueType === 'RANKED_SOLO_5x5'); 
          })
          .catch(console.log);
        // change endIndex for number of matches to retrieve 
        // TODO: change season to not be hard coded
        return leaguejs.Match.gettingListByAccount(accountObj.accountId, {queue: 420, season: 13, endIndex: 20});
    })
    .then((matchHistoryObj) => {
      let matchPromiseArr = []; 
      for (let i = 0; i < matchHistoryObj.endIndex; i++) {
        matchPromiseArr.push(leaguejs.Match.gettingById(matchHistoryObj.matches[i].gameId));
      }
      Promise.all(matchPromiseArr)
        .then((matchList) => {
          accountDetails.matchHistory = matchList; 
          console.log(accountDetails);
          res.json(accountDetails); 
        })
        .catch(console.error); 
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        // '{"status":{"message":"Data not found - summoner not found","status_code":404}}'
        if (err.error.includes('summoner not found')) {
          console.log('Summoner not found');
          res.sendStatus(404); 
        }
        else {
          console.log('Ranked match history not found');
          accountDetails.rankObj = {tier: 'UNRANKED', rank: '', wins: 0, losses: 0};
          res.json(accountDetails); 
        }
        
      }
      else {
        console.log(err); 
        res.sendStatus(404); 
      }
    }); 
});

router.get('/get-champion-data', async (req, res) => {
  let champData = await DataDragonHelper.gettingChampionsList();
  res.json(champData);
});

router.get('/get-ddragon-version'), async (req, res) => {
  let latestVersion = await DataDragonHelper.gettingLatestVersion();
  res.json(latestVersion); 
}

router.get('/verify-post', (req, res) => { 
  leaguejs.Summoner.gettingByName(req.query.name)
    .then((accountObj) => {
      if (req.query.vProfileIconId == accountObj.profileIconId) {
        res.json(true); 
      }
      else {
        res.json(false); 
      }
    })
    .catch((err) => {
      console.log(err); 
    });
});


module.exports = router;
