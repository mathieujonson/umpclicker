const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const DynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  const params = {
    TableName: "umpclicker",
    Key: { gameName: "recentGames", startTime: "list" }
  };

  await DynamoDB.get(params)
    .promise()
    .then((data, err) => {
      if (err) {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: "Uh oh! Couldn't find the list of games!"
        });
      } else {
        const currentTime = new Date().getTime();
        const recentGames = data.Item.recentGames || [];

        const cleanedGames = recentGames.filter(
          game =>
            (currentTime - parseInt(game.startTime)) / 1000 / 60 / 60 < 3 &&
            !game.isFinal
        );

        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cleanedGames)
        });
      }
    });
};
