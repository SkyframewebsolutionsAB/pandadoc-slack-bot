const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/XXX/YYY/ZZZ'; // Byt ut denna till din!

app.post('/pandadoc-webhook', async (req, res) => {
  const event = req.body;

  if (event.event_type === 'document.completed') {
    const doc = event.data;
    if (doc.name && doc.name.toLowerCase().includes('säljavtal')) {
      const slackMessage = {
        text: `🎉 Ett nytt säljavtal är signerat!\n📄 *${doc.name}*\n🔗 ${doc.details.url}`,
      };

      await axios.post(SLACK_WEBHOOK_URL, slackMessage);
    }
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening for PandaDoc webhooks...');
});
