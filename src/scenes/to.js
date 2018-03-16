const Markup = require('telegraf/markup');
const Languages = require ('google-translate-api/languages');

let trans_to;

module.exports = Scene => {
  let lang = Array.from(Object.values(Languages.langs), x => [x]).slice(1);
  const index = new Scene('to')
    , sceneMenu = lang
    , sceneKeyboard = Markup
      .keyboard(sceneMenu)
      .resize()
      .extra();

  index.enter(ctx => {
    console.info(`Serving menu to ${ctx.session.username}`);

    ctx.reply('Select the language of the translation', sceneKeyboard);
  });

  sceneMenu.forEach(elm => { //setta l'ingresso in ogni scena
    index.hears(elm, async ctx => {
      ctx.session.to = elm;
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
