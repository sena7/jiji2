import Numbers from "../../utils/numbers"

export default class NumberFormatter {

  static paddingZero(number, digit) {
      var str = ""+number;
      for ( let i=str.length; i<digit; i++ ) {
          str = "0"+str;
      }
      return str;
  }

  /**
   * 数値を3ケタごとに「,」で区切った文字列に変換する。
   */
   static insertThousandsSeparator(price) {
      if (price === 0) return "0";
      if (!price) return "";

      const result = /^([\-\+]?)(\d+)(\.\d+)?$/.exec(String(price));
      if (!result || result.length < 1) return "";

      var str = "";
      var tmp = result[2];
      while ( tmp.length > 3 ) {
          str = "," + tmp.substring(tmp.length-3, tmp.length) + str;
          tmp = tmp.substring(0, tmp.length-3);
      }
      str = tmp + str;
      return (result[1] || "") + str + (result[3] || "");
  }

  static formatDecimal(decimal, digits=0) {
    if (decimal == null) return "";
    return decimal.toFixed(digits);
  }

  static formatRatio(ratio, digits=1) {
    if (ratio == null) return "";
    return NumberFormatter.formatDecimal(ratio*100, digits) + "%";
  }

  static formatPrice(price) {
    if (price == null) return {};
    const digits = Numbers.getPositiveDigits(Math.abs(price));
    let unit = null;
    if (digits > 6) {
      price = Math.round(price/10000);
      unit  = "万";
    }
    let fixed = NumberFormatter.formatDecimal(price,
      digits > 3 ? 0 : 4 - Math.max(digits, 1) );
    const str = NumberFormatter.insertThousandsSeparator(fixed);
    return {
      price: price, str: str, unit: unit
    };
  }

}
