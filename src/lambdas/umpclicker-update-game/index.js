const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const DynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, content, callback) => {
  const requestBody = JSON.parse(event.body);
  const [gameName, startTime] = requestBody.gameId.split("+");
  const params = {
    TableName: "umpclicker",
    Key: { gameName: gameName, startTime: startTime }
  };

  await DynamoDB.get(params)
    .promise()
    .then(async (data, err) => {
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
        const newGameData = {
          ...data.Item,
          ...requestBody
        };

        await updateGame(newGameData);

        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newGameData)
        });
      }
    });
};

const updateGame = async details => {
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
