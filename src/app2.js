import TheWorld from './TheWorld'

kintone.events.on(['app.record.create.submit', 'app.record.edit.submit', 'app.record.index.edit.submit'], () => {
  new TheWorld(5).run()
})
