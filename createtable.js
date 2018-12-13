var AWS = require("aws-sdk");
/*
AWS.config.update({
    region: "us-east-2",
    endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});
*/
AWS.config.update({
    region: "us-east-2",
    endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});
//AWS.config.accessKeyId="AKIAI5O66ZOYEKYK5PPQ";
//AWS.config.secretAccessKey="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";
AWS.config.accessKeyId="AKIAJKZCK7TZ7XCH65NQ";
AWS.config.secretAccessKey="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";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Upload",
    KeySchema: [
        { AttributeName: "Upload_id", KeyType: "HASH"},  //Partition key
        { AttributeName: "Upload_name", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "Upload_id", AttributeType: "N" },
        { AttributeName: "Upload_name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
