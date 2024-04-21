require("dotenv").config();
const { Bot, GrammyError, HttpError } = require("grammy");

const bot = new Bot(process.env.BOT_API_KEY);

bot.api.setMyCommands([
  { command: "start", description: "Bot starting" },
  { command: "hello", description: "Get Hello" },
]);

bot.command("start:text", async (ctx) => {
  await ctx.reply(
    `Hey there! I'm a simple telegram bot made using grammy and nodejs.\n\n`
  );
});
// bot.on("message", async (ctx) => {
// bot.on("message:photo", async (ctx) => {
// bot.on("message:voice", async (ctx) => {
// bot.on("message:entities:url", async (ctx) => {
bot.on("::email", async (ctx) => {
  // bot.on(":photo").on("::hashtag", ()=>{}) =>

  await ctx.reply("Need think for a bit...");
});


//✅ Make my filter
bot.on("msg").filter(
  (ctx) => {
    return ctx.from.id === 970767623;
  },
  async (ctx) => {
    await ctx.reply("Hey,Admin");
  }
);

bot.hears("ping", async (ctx) => {
  await ctx.reply("pong");
});

// ctx- context
bot.command(["say_hello", "hello", "say_hi"], async (ctx) => {
  await ctx.reply(`Hello`);
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
