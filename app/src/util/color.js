define(function(){

  var _hex2rgb = function(hex){
    if (hex[0] == '#')
      hex = hex.substr(1, hex.length-1);

    if (hex.length == 6)
      rgb = [
        hex[0]+hex[1],
        hex[2]+hex[3],
        hex[4]+hex[5]
      ];
    else if (hex.length == 3)
      rgb = [
        hex[0]+hex[0],
        hex[1]+hex[1],
        hex[2]+hex[2]
      ];
    else
      return false;

    return {
      r : parseInt(rgb[0],16),
      g : parseInt(rgb[1],16),
      b : parseInt(rgb[2],16)
    };
  }

  var _hue2Rgb = function(m1, m2, hue) {
    var v;
    if (hue < 0)
      hue += 1;
    else if (hue > 1)
      hue -= 1;

    if (6 * hue < 1)
      v = m1 + (m2 - m1) * hue * 6;
    else if (2 * hue < 1)
      v = m2;
    else if (3 * hue < 2)
      v = m1 + (m2 - m1) * (2/3 - hue) * 6;
    else
      v = m1;

    return 255 * v;
  }

  var _hsl2Hex = function(h, s, l) {
    var m1, m2, hue;
    var r, g, b
    s /=100;
    l /= 100;
    if (s == 0)
      r = g = b = (l * 255);
    else {
      if (l <= 0.5)
        m2 = l * (s + 1);
      else
        m2 = l + s - l * s;
      m1 = l * 2 - m2;
      hue = h / 360;
      r = _hue2Rgb(m1, m2, hue + 1/3);
      g = _hue2Rgb(m1, m2, hue);
      b = _hue2Rgb(m1, m2, hue - 1/3);
    }
    var rgb = b | (g << 8) | (r << 16);
    return '#' + rgb.toString(16);
  }

  var _rgbToHsl = function(rgb){
    rgb.r /= 255;
    rgb.g /= 255;
    rgb.b /= 255;
    var max = Math.max(rgb.r, rgb.g, rgb.b), min = Math.min(rgb.r, rgb.g, rgb.b);
    var h, s, l = (max + min) / 2;

    if(max == min){
      h = s = 0; // achromatic
    }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case rgb.r: h = (rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6 : 0); break;
        case rgb.g: h = (rgb.b - rgb.r) / d + 2; break;
        case rgb.b: h = (rgb.r - rgb.g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h:Math.floor(h * 360),
      s:Math.floor(s * 100),
      l:Math.floor(l * 100)
    };
  }

  var _hex2Hsl = function(hex){
    return _rgbToHsl(_hex2rgb(hex));
  }

  /**
   * Interpolates color c1 and c2 expressed in #hex
   * among an spectrum of width n, taking the k-intermediate
   *
   * @param c1
   * @param c2
   * @param length
   * @param item
   */
  var interpolate = function(c1, c2, n, k){
    var hsl1  = _hex2Hsl(c1),
        hsl2 = _hex2Hsl(c2),
        hk = hsl1.h + (hsl2.h - hsl1.h) * k / n,
        sk = hsl1.s + (hsl2.s - hsl1.s) * k / n,
        lk = hsl1.l + (hsl2.l - hsl1.l) * k / n
    return _hsl2Hex(hk, sk, lk);
  }

  return {
    interpolate: interpolate
  }
});