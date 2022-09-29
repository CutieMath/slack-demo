const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// post the info to Slack API's webhook
app.post("/send-to-slack", (req, res) => {
  axios
    .post(
      "https://hooks.slack.com/services/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",
      {
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `Hello, *${req.body.name}*, your nudge is here!`,
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: " \n\n *Nudge:* \n\nA bunch of texts. ",
            },
          },
          {
            type: "divider",
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Yes I do",
                  emoji: true,
                },
                value: "click_me_123",
                url: "https://google.com",
              },
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Skip for now",
                  emoji: true,
                },
                value: "click_me_123",
                url: "https://google.com",
              },
            ],
          },
        ],
      }
    )
    .then(() => {
      res.send("Sent to slack success");
    })
    .catch((err) => {
      res.send("Error happened: ", err);
    });
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
