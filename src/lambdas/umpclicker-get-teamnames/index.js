const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const DynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  const params = {
    TableName: "umpclicker",
    Key: { gameName: "teamNames", startTime: "list" }
  };
  await DynamoDB.get(params)
    .promise()
    .then((data, err) => {
      if (err) {
        callback(null, {
          statusCode: 200,
          body: "Uh oh! Couldn't find the list of teams!"
        });
      } else {
        const names = (data.Item.names || []).sort();
        names.unshift("Us", "Them");
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(names)
        });
      }
    });
};
