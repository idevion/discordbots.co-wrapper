const { EventEmitter } = require("events");
const fetch = require("node-fetch");

class DiscordBotsCo extends EventEmitter {
  /**
   * Creates a new instance of the class
   * @param {string} apiKey Your API key.
   * @param {string} botID Your bots user ID
   */
  constructor(apiKey, botID) {
    super();

    if (!apiKey) {
      throw new Error("API key must be passed through the constructor.");
    }

    if (!botID) {
      throw new Error("BotID must be passed through the constructor.");
    }

    /**
     * The bots user ID
     * @type {string}
     */
    this.botID = botID;

    /**
     * The API key provided
     * @type {string}
     */
    this.apiKey = apiKey;
  }

  /**
   * Post your bots stats to the API
   * @param {number} servers The amount of servers
   * @param {?number} shards The amount of shards
   */
  async postStats(servers, shards = 0) {
    try {
      const response = await this.request(
        `/v1/public/bot/${this.botID}/stats`,
        "POST",
        {
          serverCount: servers,
          shardCount: shards,
        }
      );

      if (response.error) {
        return this.emit(
          "error",
          new Error(
            `Could not successfully make a request. Reason: ${
              response.response || "Reason not provided by API"
            }`
          )
        );
      }

      this.emit("posted", response.response);
    } catch (error) {
      this.emit("error", error);
    }
  }

  /**
   * Get the current bots statistics
   */
  getStats() {
    try {
      return this.request(`/v1/public/bot/${this.botID}`);
    } catch (error) {
      this.emit("error", error);
    }
  }

  /**
   * Makes a request to the API
   * @param {string} endpoint The endpoint
   * @param {"GET" | "POST"} method The method
   * @param {?Object} body The optional body.
   * @private
   */
  request(endpoint, method = "GET", body) {
    return fetch(`https://api.discordbots.co${endpoint}`, {
      method,
      body: method === "POST" && body ? JSON.stringify(body) : undefined,
      headers: {
        authorization: this.apiKey,
      },
    }).then((res) => res.json());
  }
}

module.exports = DiscordBotsCo;
