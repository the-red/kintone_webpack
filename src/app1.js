import $ from 'jquery';
import kintoneUtility from 'kintone-utility/docs/kintoneUtility';

const insertRecord = async () => {
  // レコード取得
  const { getRecords } = await kintoneUtility.rest.getRecords({
    app: kintone.app.getId(),
    query: kintone.app.getQuery(),
  });
  console.log(getRecords);

  // レコード挿入
  const postRecords = [];
  for (let i = 0; i < 1000; i++) {
    const r = {
      予算: { value: i },
      拠点: { value: `拠点${i}` },
    };
    postRecords.push(r);
  }
  const postResp = await kintoneUtility.rest.postRecords({
    app: kintone.app.getId(),
    records: postRecords,
  });
  console.log(postResp);
};

kintone.events.on('app.record.index.show', () => {
  const $button = $('<button>', {
    text: 'レコードを1000件追加',
    click: insertRecord,
  });

  $(kintone.app.getHeaderMenuSpaceElement()).append($button);
});
