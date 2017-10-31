import TheWorld from './TheWorld'

kintone.events.on('app.record.index.show', () => {
  new TheWorld(3).run()
})

kintone.events.on('app.record.detail.show', () => {
  new TheWorld(1).run()
})
