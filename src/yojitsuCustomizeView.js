import Vue from 'vue'
import kintoneUtility from 'kintone-utility/docs/kintoneUtility'
import HTML_TEMPLATE from './yojitsuCustomizeView.html'
import style from './yojitsuCustomizeView.scss'

kintone.events.on('app.record.index.show', event => {
  // kintoneアプリストアの「予算・実績管理」を使用する
  // アプリ側の設定は変更不要
  // 「予実管理一覧」が最初からカスタマイズビューとして設定されており
  // 以下の2行のHTMLコードが記載されている
  // <table id="view"></table>
  // <div id = "pager"></div>

  if (event.viewName !== '予実管理一覧') {
    return
  }

  // カスタマイズビューの場合のみスタイルシートを適用
  style.use()

  // kintoneに設定済みのタグを自作のHTMLファイルで置換
  const tableNode = document.querySelector('table#view')
  const pagerNode = document.querySelector('#pager')
  const { parentNode } = tableNode
  tableNode.insertAdjacentHTML('beforebegin', HTML_TEMPLATE)
  parentNode.removeChild(tableNode)
  parentNode.removeChild(pagerNode)
  ;(async () => {
    // 実績管理アプリのレコードを取得
    const { records: mainRecords } = await kintoneUtility.rest.getAllRecordsByQuery({
      app: kintone.app.getId(),
      query: kintone.app.getQuery()
    })

    // 予算管理アプリのレコードを取得
    const { records: optRecords } = await kintoneUtility.rest.getAllRecordsByQuery({
      app: kintone.app.getLookupTargetAppId('拠点')
    })

    const records = mainRecords.map(r => {
      // 担当者が複数人の場合は1つの文字列にまとめる
      r.person = r.担当者.value.map(p => p.name).join(', ')
      // 実績を数値化
      r.actual = Number(r.実績合計.value)
      // 予算を数値化
      for (const o of optRecords) {
        if (r.拠点.value === o.拠点.value) {
          r.budget = Number(o.予算.value)
        }
      }
      // 値引き額の初期値
      r.discount = 0

      return r
    })

    new Vue({
      // Vueを適用するelement
      el: '#customize_view',
      data: {
        records
      },
      computed: {
        discountedActuals() {
          return records.map(r => r.actual - r.discount)
        },
        diffs() {
          return records.map((r, i) => r.budget - this.discountedActuals[i])
        }
      },
      methods: {
        dummyAlert(e) {
          const buttonName = e.target.innerHTML || e.target.value
          window.alert(`「${buttonName}」ボタンはダミーです。`)
        }
      }
    })
  })()
})
