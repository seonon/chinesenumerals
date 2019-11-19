const should = require('chai').should();

const {
  military,
  chinese,
  transformer
} = require('./chinesenumerals');


describe('Military<=>Digits', function () {

  describe('Military to Digits', function () {
    it('should return 42 for input 四两', function () {
      military.toDigits('四两').should.equal('42');
    });

    it('should return 2019 for input 两洞幺勾', function () {
      military.toDigits('两洞幺勾').should.equal('2019');
    });

    it('should return 8341 for input 八三四幺', function () {
      military.toDigits('八三四幺').should.equal('8341');
    });

    it('should return 1234567890 for input 幺两三四五六拐八勾洞', function () {
      military.toDigits('幺两三四五六拐八勾洞').should.equal('1234567890');
    });
  });

  describe('Digits to Military', function () {
    it('should return 四两 for input 42', function () {
      military.toMilitary(42).should.equal('四两');
    });

    it('should return 两洞幺勾 for input 2019', function () {
      military.toMilitary('2019').should.equal('两洞幺勾');
    });

    it('should return 八三四幺 for input 8341', function () {
      military.toMilitary('8341').should.equal('八三四幺');
    });

    it('should return 洞幺两三四五六拐八勾 for input 0123456789', function () {
      military.toMilitary('0123456789').should.equal('洞幺两三四五六拐八勾');
    });
  });
});



describe('Chinese<=>Arabic', function () {

  describe('Chinese to Arbic', function () {

    it('should return 7 for input 七', function () {
      chinese.toArabic('七').should.equal(7);
    });
    it('should return 17 for input 十七', function () {
      chinese.toArabic('十七').should.equal(17);
    });
    it('should return 42 for input 四十二', function () {
      chinese.toArabic('四十二').should.equal(42);
    });
    it('should return 111 for input 一百一十一', function () {
      chinese.toArabic('一百一十一').should.equal(111);
    });
    it('should return 520 for input 五百二', function () {
      chinese.toArabic('五百二').should.equal(520);
    });
    it('should return 2019 for input 两千零一十九', function () {
      chinese.toArabic('两千零一十九').should.equal(2019);
    });

    it('should return 1024 for input 一千零二十四', function () {
      chinese.toArabic('一千零二十四').should.equal(1024);
    });
    it('should return 1893 for input 一千八百九十三', function () {
      chinese.toArabic('一千八百九十三').should.equal(1893);
    });
    it('should return 1234567890 for input 十二亿三千四百五十六万七千八百九十', function () {
      chinese.toArabic('十二亿三千四百五十六万七千八百九十').should.equal(1234567890);
    });
    it('should return 31041592654 for input 三百一十亿四千一百五十九万两千六百五十四', function () {
      chinese.toArabic('三百一十亿四千一百五十九万两千六百五十四').should.equal(31041592654);
    });
  });

  describe('Arabic to Chinese', function () {

    it('should return 七 for input 7', function () {
      chinese.toChinese(7).should.equal('七');
    });

    it('should return 十六 for input 16', function () {
      chinese.toChinese(16).should.equal('十六');
    });

    it('should return 四十二 for input 42', function () {
      chinese.toChinese(42).should.equal('四十二');
    });
    it('should return 一百一十一 for input 111', function () {
      chinese.toChinese(111).should.equal('一百一十一');
    });
    it('should return 一百零一 for input 101', function () {
      chinese.toChinese(101).should.equal('一百零一');
    });
    it('should return 五百二十 for input 520', function () {
      chinese.toChinese(520).should.equal('五百二十');
    });
    it('should return 两千零一十九 for input 2019', function () {
      chinese.toChinese(2019).should.equals('二千零一十九');
    });

    it('should return 一千零二十四 for input 1024', function () {
      chinese.toChinese(1024).should.equal('一千零二十四');
    });

    it('should return 一千二百 for input 1200', function () {
      chinese.toChinese(1200).should.equal('一千二百');
    });

    it('should return 一万零一十 for input 10010', function () {
      chinese.toChinese(10010).should.equal('一万零一十');
    });

    it('should return 一千零五万零二十六 for input 10,050,026', function () {
      chinese.toChinese(10050026).should.equal('一千零五万零二十六');
    });

    it('should return 十二亿三千四百五十六万七千八百九十 for input 1234567890', function () {
      chinese.toChinese(1234567890).should.equal('十二亿三千四百五十六万七千八百九十');
    });


  });
});
const biggestChineseNumber = '九千九百九十九载九千九百九十九正九千九百九十九涧' +
  '九千九百九十九沟九千九百九十九穰九千九百九十九秭' +
  '九千九百九十九垓九千九百九十九京九千九百九十九兆' +
  '九千九百九十九亿九千九百九十九万九千九百九十九';

describe('special numbers', function () {
  describe('special chinese numbers', function () {
    it(`should return as the biggest number`, function () {
      chinese.biggest.should.equal(biggestChineseNumber)
    })
  })
})

describe('auto generated serial number test for chinese<=>arabic', function () {
  for (let i = 0; i < 100002; i++) {
    it(`should return ${i} for input ${i}`, function () {
      chinese.toArabic(chinese.toChinese(i)).should.equal(i);
    });
  }
})

describe('auto generated random number test for chinese<=>arabic', function () {
  let base = 1e+6;
  for (let i = 6; i < 18; i++) {
    for (let j = 0; j < 200; j++) {
      const num = parseInt(Math.random() * base);
      it(`should return ${num} for input ${num}`, function () {
        chinese.toArabic(chinese.toChinese(num)).should.equal(num);
      });
    }
    base *= 10;
  }

})


describe('Simplified: big writing <=> small writing', function () {

  describe('big writing =>small writing', function () {
    it('should return 一万 for input 壹萬', function () {
      transformer.fromSimplifiedBigWriting('壹萬').should.equal('一万');
    });
    it('should return 四十二 for input 肆拾贰', function () {
      transformer.fromSimplifiedBigWriting('肆拾贰').should.equal('四十二');
    });
    it('should return 一千零五万零二十六 for input 壹仟零伍萬零贰拾陆', function () {
      transformer.fromSimplifiedBigWriting('壹仟零伍萬零贰拾陆').should.equal('一千零五万零二十六');
    });
    it('should return 十二亿三千四百五十六万七千八百九十 for input 拾贰億叁仟肆佰伍拾陆萬柒仟捌佰玖拾', function () {
      transformer.fromSimplifiedBigWriting('拾贰億叁仟肆佰伍拾陆萬柒仟捌佰玖拾').should.equal('十二亿三千四百五十六万七千八百九十');
    });
  })

  describe('small writing =>big writing', function () {

    it('should return 壹萬 for input 一万', function () {
      transformer.toSimplifiedBigWriting('一万').should.equal('壹萬');
    });
    it('should return 肆拾贰 for input 四十二', function () {
      transformer.toSimplifiedBigWriting('四十二').should.equal('肆拾贰');
    });
    it('should return 壹仟零伍萬零贰拾陆 for input 一千零五万零二十六', function () {
      transformer.toSimplifiedBigWriting('一千零五万零二十六').should.equal('壹仟零伍萬零贰拾陆');
    });
    it('should return 拾贰億叁仟肆佰伍拾陆萬柒仟捌佰玖拾 for input 十二亿三千四百五十六万七千八百九十', function () {
      transformer.toSimplifiedBigWriting('十二亿三千四百五十六万七千八百九十').should.equal('拾贰億叁仟肆佰伍拾陆萬柒仟捌佰玖拾');
    });
  })
})