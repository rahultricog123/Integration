const express = require('express');
const request = require('request');

const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const rowData = req.body.values;
  createTestCase(rowData);
  res.status(200).send('Webhook received successfully');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

function createTestCase(rowData) {
  // Enter the code to create a new test case in Zephyr Scale here
  var url = 'https://your-jira-instance.com/rest/zapi/latest/testcase';
  var payload = {
    'name': rowData[0],
    'projectKey': rowData[1],
    'issueTypeId': rowData[2]
  };
  var options = {
    'method': 'post',
    'payload': JSON.stringify(payload),
    'headers': {
      'Authorization': 'Basic ' + Utilities.base64Encode('username:password'),
      'Content-Type': 'application/json'
    }
  };
  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
}
