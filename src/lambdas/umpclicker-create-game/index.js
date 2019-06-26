const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const DynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const home = body.home;
  const away = body.away;

  const isValid = await areTeamsValid(home, away);

  if (!isValid) {
    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ message: "Woah, team names are invalid" })
    });
    return;
  }

  const game = {
    gameName: `${home.replace(" ", "_").toLowerCase()}-${away
      .replace(" ", "_")
      .toLowerCase()}`,
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

  await createGame(game);

  await addGameToRecent(game, callback);

  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json"
    },
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

const addGameToRecent = async (game, callback) => {
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
      recentGames: cleanedGames
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
