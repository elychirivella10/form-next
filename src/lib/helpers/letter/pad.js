export function padLeft(str, padStr, len) {
    var strLen = str.length;
    if (strLen >= len) {
      return str;
    }
    var padLen = len - strLen;
    var pad = new Array(padLen);
    for (var i = 0; i < padLen; i++) {
      pad[i] = padStr;
    }
    return pad.join("") + str;
  }