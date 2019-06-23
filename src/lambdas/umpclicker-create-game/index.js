const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const DynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  const home = event.home;
  const away = event.away;

  const game = {
    gameName: `${home.toLowerCase()}-${away.toLowerCase()}`,
    homeTeam: home,
    awayTeam: away,
    startTime: new Date().getTime().toString(),
    balls: 0,
    strikes: 0,
    outs: 0,
    inning: 1,
    halfInning: "top",
    home: 0,
    away: 0,
    isFinal: false
  };

  const isValid = await areTeamsValid(event.home, event.away);

  if (!isValid) {
    callback(null, {
      statusCode: 200,
      body: "Woah, the teams aren't valid..."
    });
    return;
  }

  await createGame(game);
  await addGameToRecent(game);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(game)
  });
};

const areTeamsValid = async (home, away) => {
  if (!home || !away || home === away) {
    return false;
  }

  const params = {
    TableName: "umpclicker",
    Key: { gameName: "teamNames", startTime: "list" }
  };

  return await DynamoDB.get(params)
    .promise()
    .then((data, err) => {
      if (err) {
        return false;
      }
      const names = data.Item.names;
      return names.includes(home) && names.includes(away);
    });
};

const addGameToRecent = async game => {
  const recentGames = await getRecentGames();

  recentGames.push(game);

  const currentTime = new Date().getTime();

  const cleanedGames = recentGames.filter(
    game =>
      currentTime - parseInt(game.startTime) / 1000 / 60 / 60 < 3 &&
      !game.isFinal
  );

  const params = {
    TableName: "umpclicker",
    Item: {
      gameName: "recentGames",
      startTime: "list",
      cleanedGames
    }
  };

  return await DynamoDB.put(params, err => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Success");
    }
  });
};

const getRecentGames = async () => {
  const params = {
    TableName: "umpclicker",
    Key: { gameName: "recentGames", startTime: "list" }
  };
  return await DynamoDB.get(params)
    .promise()
    .then(data => (Object.keys(data).length ? data.Item.recentGames : []));
};

const createGame = async details => {
  const params = {
    TableName: "umpclicker",
    Item: details
  };
  return await DynamoDB.put(params, err => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Success");
    }
  });
};
