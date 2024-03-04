require("dotenv").config();
const { Bot, GrammyError, HttpError } = require("grammy");

const bot = new Bot(process.env.BOT_API_KEY);

bot.command("start", async (ctx) => {
  await ctx.reply(
    `Hey there! I'm a simple telegram bot made using grammy and nodejs.\n\n`
  );
});
bot.on("message", async (ctx) => {
  await ctx.reply("Need think for a bit...");
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;

  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknow error", e);
  }
});

bot.start();
