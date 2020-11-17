# unofficial-discordbots.co

The unofficial [discordbots.co](https://discordbots.co/) API wrapper.

---

## Usage

Example:

```js
const DiscordBots = require("unofficial-discordbots.co");
const somediscordlib = require("somediscordlib"); // replace with your discord library of your choice, and set it up.

// assuming you have a client defined, set the class as a property.
whateveryouhaveasyourclient.dbots = new DiscordBots(
  "your api key",
  "your bots id"
);

// set an interval to post every 5 minutes,
// obviously, subsitute what you need to use.
setInterval(
  () =>
    whateveryouhaveasyourclient.dbots.postStats(
      whateveryouhaveasyourclient.guildCount,
      whateveryouhaveasyourclient.shardCount
    ),
  300000
); 
```

### Events

`error`  -> When the API errors. `@param {Error | string} error`

`posted` -> When you post to the API.

---

> Yeah, that should be it.
