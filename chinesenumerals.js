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
    ]
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
    if (last.length > 1 && last[1] !== '千') {
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

  toDecimal(num) {
    return ''
  }
}
module.exports = {
  military: new Military(),
  chinese: new Chinese()
}