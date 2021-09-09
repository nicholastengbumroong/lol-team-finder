## LoL-Team-Finder
https://lol-team-finder.herokuapp.com/

A web app created for LoL players who want to find a duo partner to climb the ranked ladder with. The site lets you submit your name, preferred position and an optional comment and it will create a post using the Riot API to fetch your current rank/tier as well as some stats based on your recent ranked match history. Users are also able to verify or delete their posts should they feel the need to do so. 

## Tools & Technologies
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com/)
- [Heroku](https://www.heroku.com/) 
- [Bootstrap](https://getbootstrap.com/)
- [Riot API](https://developer.riotgames.com/)
- [LeagueJS](https://github.com/Colorfulstan/LeagueJS)

## Demo
<p align="middle">
  <img src="https://github.com/nicholastengbumroong/lol-team-finder/blob/main/screenshots/homepage-img.png" width="80%"/>
  <img src="https://github.com/nicholastengbumroong/lol-team-finder/blob/main/screenshots/post-img.png" width="80%"/>
</p>

## Challenges
- Rate Limiting: The dev api key provided for the riot api only allows 20 requests per second and 100 requests every 2 minutes. Aggregating the average stats for a player requires getting the specific match details from their recent match history, each of which requires a call to the api. Request retries are handled automatically by [LeagueJS](https://github.com/Colorfulstan/LeagueJS) but there would still be extremely long loading times so I had to limit the number of matches used and the type of match to ranked solo/duo queue.
- Authentication: Anyone can submit a name for a post which creates an issue of fake posts being made. I couldn't find a way to use the riot login system to authenticate a user before a form is submitted so I created a workaround through an optional verification system which asks users to change their profile pictures to a specified one. Since the user can only do so by logging in through the official League client, this provides a form of indirect authentication.
