class Military {
  constructor() {
    this.extractDigits = /^\d+/;
    this.PLANumbers = {
      '0': '洞',
      '1': '幺',
      '2': '两',
      '3': '三',
      '4': '四',
      '5': '五',
      '6': '六',
      '7': '拐',
      '8': '八',
      '9': '勾'
    };
    this.PLANumbersReverse = {
      '洞': '0',
      '幺': '1',
      '两': '2',
      '三': '3',
      '四': '4',
      '五': '5',
      '六': '6',
      '拐': '7',
      '八': '8',
      '勾': '9'
    }
  }
  toMilitary(num) {
    let toNum = num;
    if (typeof num !== Number) {
      let match = this.extractDigits.exec(num);
      if (!match) {
        return '';
      }
      toNum = match[0];
    }

    return toNum.toString().split('').map(char => this.PLANumbers[char]).join('');
  }

  toDigits(num) {
    return num.split('').map(char => this.PLANumbersReverse[char]).join('');
  }

}

class Chinese {
  constructor() {

  }
  toChinese() {
    return ''
  }
  toDecimal() {
    return ''
  }
}
module.exports = {
  military: new Military(),
  chinese: new Chinese()
}