const path = require('path')
, Telegraf = require('telegraf')
, session = require(path.resolve(__dirname, 'session'))
, scenes = require(path.resolve(__dirname, 'scenes'))
, bot = new Telegraf("BOT_TOKEN");

console.info('Instantiating bot...');
bot.use(session);
module.exports = scenes.then(theScenes => {

  bot.use(theScenes.middleware());
  bot.start(async ctx => { //codice al comando /start
    const {username, id, first_name, last_name} = ctx.message.from;

    console.info(`User ${first_name} ${last_name} is connected with username ${username} and telegram identifier ${id}`);
    ctx.session.username = username;
    try {
      await ctx.reply(`Benvenuto ${username}!`); //risponde allo start
      console.info(`Moving user to ${scenes.landingScene} scene`);
      return await ctx.scene.enter(scenes.landingScene); //invia user sulla scena landingScene
    } catch (e) {
      console.error(`Bot blocked by user ${username}`);
    }
  });
}).then(() => bot);
