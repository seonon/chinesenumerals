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

  constructor(opts = {}) {
    this.options = {
      zeroChar: '零', //another chioce is 〇
    };
    this.options = Object.assign(this.options, opts);
    this.standardNumbers = {
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
      7: '七',
      8: '八',
      9: '九',
    };
    this.standardNumbersReverse = {
      '一': 1,
      '二': 2,
      '两': 2,
      '三': 3,
      '四': 4,
      '五': 5,
      '六': 6,
      '七': 7,
      '八': 8,
      '九': 9,
      '十': 10,
      '百': 100,
      '千': 1000,
      '万': 10000,
      '亿': 1e+8,
    };
    this.digits = [{
        value: 1000,
        char: '千'
      },
      {
        value: 100,
        char: '百'
      },
      {
        value: 10,
        char: '十'
      }
    ];

    this.bigNumbers = [{
        value: 1e+44,
        char: '载'
      },
      {
        value: 1e+40,
        char: '正'
      },
      {
        value: 1e+36,
        char: '涧'
      },
      {
        value: 1e+32,
        char: '沟'
      },
      {
        value: 1e+28,
        char: '穰'
      },
      {
        value: 1e+24,
        char: '秭'
      },
      {
        value: 1e+20,
        char: '垓'
      },
      {
        value: 1e+16,
        char: '京'
      },
      {
        value: 1e+12,
        char: '兆'
      },
      {
        value: 1e+8,
        char: '亿'
      },
      {
        value: 1e+4,
        char: '万'
      }
    ];

    this.reg10K = /(.){1}(千|百|十)/g;
    this.reg = /(.+?)(万|亿|兆|京|垓|秭|穰|沟|涧|正|载)/g;
  }
  toChinese(num) {
    if (num > 9999 * 10 ** 44) {
      throw new Error('Number to large, Unable to process!');
    }
    let res = ''
    this.bigNumbers.forEach(place => {
      let current = Math.floor(num / place.value);

      if (current > 0) {
        const count = this.toChineseUnder10K(current);
        if (count.length > 1 && count[1] !== '千') {
          res += '零' + count + place.char;
        } else {
          res += count + place.char;
        }
        num -= current * place.value;
      }
    })


    let last = this.toChineseUnder10K(num);
    if (last.length === 1 || last[1] !== '千') {
      res = res + '零' + last;
    } else {
      res = res + last;
    }

    if (res.startsWith('零')) {
      res = res.slice(1)
    }
    return res.replace(/^一十/, '十');;
  }


  toChineseUnder10K(num) {
    if (num > 9999) {
      return ''
    }
    let res = '';
    let currentIndex = 0;
    let self = this;
    let precedingNumber = false;
    this.digits.forEach((place, index) => {
      let current = parseInt(num / place.value);
      if (current > 0) {
        if (index > currentIndex + 1 && precedingNumber) {
          res += self.options.zeroChar;
        }
        currentIndex = index;
        precedingNumber = true;
        res += self.standardNumbers[current] + place.char;
        num -= current * place.value;
      }

    });
    let last = this.standardNumbers[num];
    if (last) {
      if (res.length > 1 && !res.endsWith('十')) {
        last = '零' + last;
      }
      res += last;
    }
    return res
  }

  toArabic(num) {
    let res = 0;
    let lastIndex = 0;
    let preLength = 0;
    let match;

    do {
      match = this.reg.exec(num)
      if (!match) {
        break;
      }
      let digits = match[1];
      preLength = digits.length + 1;
      let place = match[2];
      lastIndex = match.index
      res += this.toArabicUnder10K(digits) * this.standardNumbersReverse[place];

    } while (match)

    if (num.length > lastIndex + preLength) {
      let reminder = num.slice(lastIndex + preLength);
      reminder = reminder.replace(/^零/, '');
      const under = this.toArabicUnder10K(reminder);
      res += under;
    }
    return res;
  }

  toArabicUnder10K(num) {
    if (num.length === 1) {
      return this.standardNumbersReverse[num];
    }
    if (num.length === 2 && num[0] === '十') {
      return 10 + this.standardNumbersReverse[num[1]]
    }
    let res = 0;
    let match;
    let lastIndex = 0;
    let place;
    do {
      match = this.reg10K.exec(num)
      if (!match) {
        break;
      }
      let digit = match[1];
      place = match[2];
      lastIndex = match.index
      res += this.standardNumbersReverse[digit] * this.standardNumbersReverse[place];

    } while (match)
    if (num.length > lastIndex + 2) {

      if (num[lastIndex + 2] === '零') {
        res += this.standardNumbersReverse[num[lastIndex + 3]];
      } else {

        res += this.standardNumbersReverse[num[lastIndex + 2]] * this.standardNumbersReverse[place] / 10;
      }
    }
    return res;
  }
}


class SimplifiedSmallWriting {
  constructor() {
    this.fromSBW = {
      '壹': '一',
      '贰': '二',
      '叁': '三',
      '肆': '四',
      '伍': '五',
      '陆': '六',
      '柒': '七',
      '捌': '八',
      '玖': '九',
      '拾': '十',
      '佰': '百',
      '仟': '千',
      '萬': '万',
      '億': '亿'
    }
    this.toSBW = {
      '一': '壹',
      '二': '贰',
      '三': '叁',
      '四': '肆',
      '五': '伍',
      '六': '陆',
      '七': '柒',
      '八': '捌',
      '九': '玖',
      '十': '拾',
      '百': '佰',
      '千': '仟',
      '万': '萬',
      '亿': '億'
    }
    this.fromTSW = {
      '萬': '万',
      '億': '亿'
    }
    this.toTSW = {
      '万': '萬',
      '亿': '億'
    }
    this.fromTBW = {
      '壹': '一',
      '貳': '二',
      '叄': '三',
      '肆': '四',
      '伍': '五',
      '陸': '六',
      '柒': '七',
      '捌': '八',
      '玖': '九',
      '拾': '十',
      '佰': '百',
      '仟': '千',
      '萬': '万',
      '億': '亿'
    }
    this.toTBW = {
      '一': '壹',
      '二': '貳',
      '三': '叄',
      '四': '肆',
      '五': '伍',
      '六': '陸',
      '七': '柒',
      '八': '捌',
      '九': '玖',
      '十': '拾',
      '百': '佰',
      '千': '仟',
      '万': '萬',
      '亿': '億'
    }

  }
  tranform(num, dictionary) {
    const res = num.replace(/./g, function (m) {
      if (m in dictionary) {
        return dictionary[m];
      } else {
        return m;
      }
    });
    return res;
  }
  toSimplifiedBigWriting(num) {
    return this.tranform(num, this.toSBW);
  }
  fromSimplifiedBigWriting(num) {
    return this.tranform(num, this.fromSBW);
  }
  fromTraditionalSmallWriting(num) {
    return this.tranform(num, this.fromTSW)
  }
  toTraditionalSmallWriting(num) {
    return this.tranform(num, this.toTSW)
  }
  fromTraditionalBigWriting(num) {
    return this.tranform(num, this.fromTBW)
  }
  toTraditionalBigWriting(num) {
    return this.tranform(num, this.toTBW)
  }

}

module.exports = {
  military: new Military(),
  chinese: new Chinese(),
  transformer: new SimplifiedSmallWriting()
}