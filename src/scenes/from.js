const Markup = require('telegraf/markup');
const Languages = require ('google-translate-api/languages');

let trans_from;
module.exports = Scene => {
  let lang = Array.from(Object.values(Languages.langs), x => [x]);
  lang.splice(0, 0, ["🔙 Back"]);

  const index = new Scene('from')
    , sceneMenu = lang
    , sceneKeyboard = Markup
      .keyboard(sceneMenu)
      .resize()
      .extra();

  index.enter(ctx => {
    console.info(`Serving menu to ${ctx.session.username}`);
    ctx.reply('Choose the language of the text you want to translate (Automatic for automatic detection)', sceneKeyboard);
  });

  index.hears('🔙 Back', async ctx => {
    await index.leave();  
    await ctx.scene.enter('settings');
  });

  sceneMenu.forEach(elm => { //setta l'ingresso in ogni scena
    index.hears(elm, async ctx => {
      ctx.session.from = elm;
      console.info(`Navigation from menu to ${elm}`);
      await index.leave();
      await ctx.scene.enter('settings');
    });
  });

  index.on('message', (ctx) => {
    ctx.reply("Please use the buttons")
  })

  return index;
};