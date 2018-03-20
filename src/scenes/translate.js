const Markup = require('telegraf/markup');
const Translate = require ('google-translate-api');
const Languages = require ('google-translate-api/languages');
const From = require('./from.js');
const To = require('./to.js');

module.exports = Scene => {
  const index = new Scene('translate')
    , sceneMenu = ['🔙 Back']
    , sceneKeyboard = Markup
      .keyboard(sceneMenu)
      .resize()
      .extra();

  index.enter(ctx => {
    console.info(`Serving menu to ${ctx.session.username}`);
    ctx.reply('Write your text', sceneKeyboard);
  });

  index.hears('<-- Back', async ctx => {
    await index.leave();  
    await ctx.scene.enter('settings');
  });

  index.on('text', (ctx) => {
    Translate(ctx.message.text, {from: Languages.getCode(ctx.session.from[0]), to: Languages.getCode(ctx.session.to[0])}).then(res => {
        ctx.reply(res.text);
    }).catch(err => {
        console.error(err);
    });
  })

  index.on('message', (ctx) => {
    ctx.reply("I'm sorry, I only understand text")
  })

  return index;
};
