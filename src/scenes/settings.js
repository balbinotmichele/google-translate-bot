const Markup = require('telegraf/markup');
const Languages = require ('google-translate-api/languages');

module.exports = Scene => {
  const index = new Scene('settings')
    , sceneMenu = [['Text language'], ['Translation language'], ['Translate']]
    , sceneKeyboard = Markup
      .keyboard(sceneMenu)
      .resize()
      .extra();

  index.enter(ctx => {
    console.info(`Serving menu to ${ctx.session.username}`);
    ctx.session.from = 'Automatic';
    ctx.session.to = 'English';
    //console.log(sceneMenu)
    ctx.reply('Select the languages for the translation and click "Translate" \n\nSelected text language ' + ctx.session.from + '\nSelected translation language ' + ctx.session.to, sceneKeyboard);
  });

  sceneMenu.forEach(elm => { 
    index.hears(elm, async ctx => {
      if (elm == 'Text language') {
        await index.leave();
        await ctx.scene.enter('from');
      }
      else  if (elm == 'Translation language') {
        await index.leave();
        await ctx.scene.enter('to');
      }
      else if (elm == 'Translate') {
        await index.leave();
        await ctx.scene.enter('translate');
      }      
    });
  });

  index.on('message', (ctx) => {
    ctx.reply("Please use the buttons")
  })

  return index;
};