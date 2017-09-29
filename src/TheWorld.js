import 'babel-polyfill';

export default class TheWord {
  constructor(sec) {
    this.waitingTime = sec;
  }
  async run() {
    window.alert('ザ・ワールド！');
    await new Promise(r => setTimeout(r, this.waitingTime * 1000));
    window.alert(`${this.waitingTime}秒経過！時は動き出す・・・`);
  }
}
