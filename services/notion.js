const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

module.exports = async function getEvents() {
  const payload = {
    path: `databases/${DATABASE_ID}/query`,
    method: "POST",
  };
  const { results } = await notion.request(payload);

  const events = results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Event_Name.title[0].text.content,
      date: page.properties.Date.date.start,
      description: page.properties.Description.rich_text[0].text.content,
    };
  });

  return events;
};
