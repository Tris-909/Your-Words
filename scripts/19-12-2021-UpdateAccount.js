const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-southeast-2" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// GET Todos based on old user ID then update their userId to new user ID (email) (DONE)
// GET Headings based on old user ID then update their userId to new user ID (email) (DONE)
// GET Images based on old user ID then update their userId to new user ID (email) (DONE)
// GET Stickers based on old user ID then update their userId to new user ID (email) (DONE)

const oldUserId = "DUMMY_OLD_USER_ID";
const newUserID = "DUMMY_NEW_USER_ID";
const tableName = "DUMMY_TABLE_NAME";

const params = {
  TableName: tableName,
  FilterExpression: `#userId = :oldUserId`,
  ExpressionAttributeNames: {
    "#userId": "userId",
  },
  ExpressionAttributeValues: {
    ":oldUserId": oldUserId,
  },
};

dynamoDB.scan(params, (error, data) => {
  if (error) {
    console.log("ERROR", error);
  } else if (data) {
    console.log("SUCCESS", data);
    const { Items } = data;

    for (let i = 0; i < Items.length; i++) {
      const updateParams = {
        TableName: tableName,
        Key: {
          id: Items[i].id,
        },
        UpdateExpression: "set userId = :newUserID",
        ExpressionAttributeValues: {
          ":newUserID": newUserID,
        },
      };

      dynamoDB.update(updateParams, (err, data) => {
        if (err) {
          console.log("UPDATE ITEM FAIL", err);
        } else {
          console.log("UPDATE ITEM SUCCESSFULLY");
        }
      });
    }
  }
});
