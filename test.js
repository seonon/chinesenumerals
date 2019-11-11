const should = require('chai').should();

const {
  military,
  chinese
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



describe('Chinese<=>Decimal', function () {
  describe('Chinese to Decimal', function () {
    it('should return 42 for input 四十二', function () {
      chinese.toDecimal('四两').should.equal('42');
    });

    it('should return 2019 for input 两千零一十九', function () {
      chinese.toDecimal('两千零一十九').should.equal(2019);
    });

    it('should return 1024 for input 一千零二十四', function () {
      chinese.toDecimal('一千零二十四').should.equal(1024);
    });

    it('should return 1234567890 for input 十二亿三千四百五十六万七千八百九十', function () {
      chinese.toDecimal('十二亿三千四百五十六万七千八百九十').should.equal(1234567890);
    });
  });

  describe('Decimal to Chinese', function () {
    it('should return 四十二 for input 42', function () {
      chinese.toChinese(42).should.equal('四十二');
    });

    it('should return 两千零一十九 for input 2019', function () {
      chinese.toChinese(2019).should.equal('两千零一十九');
    });

    it('should return 一千零二十四 for input 1024', function () {
      chinese.toChinese(1024).should.equal('一千零二十四');
    });

    it('should return 十二亿三千四百五十六万七千八百九十 for input 1234567890', function () {
      chinese.toChinese(1234567890).should.equal('十二亿三千四百五十六万七千八百九十');
    });
  });
});