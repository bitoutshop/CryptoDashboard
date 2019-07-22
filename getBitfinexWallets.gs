//Grab data from Bitfinex API
  function getBitfinexWallets (bitfinexApiKey,bitfinexApiSecret) {
    function bytesToHex(data) {
        return data.map(function(e) {
            var v = (e < 0 ? e + 256 : e).toString(16);
            return v.length == 1 ? "0" + v : v;
        }).join("");
    }
    const apiPath = "v2/auth/r/wallets";
    const nonce = Date.now().toString();
    const body = { "type": "price" };
    const rawBody = JSON.stringify(body);
    var signature = "/api/" + apiPath + nonce + rawBody;
    signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_384, signature, bitfinexApiSecret);
    signature = bytesToHex(signature);
    const url = "https://api.bitfinex.com/" + apiPath;
    const options = {
      method: 'POST',
      contentType: "application/json",
      headers: {
        'bfx-nonce': nonce,
        'bfx-apikey': bitfinexApiKey,
        'bfx-signature': signature
      },
      payload: rawBody
    };
    var response = UrlFetchApp.fetch(url, options);
 
    var data = JSON.parse(response.getContentText()); 
   
  return data; //[19-07-21 17:18:21:665 AEST] [[funding, BTC, 5.2E-7, 0, null], [funding, USD, 23085.88324821, 0, null], [exchange, LTC, 8.273E-5, 0, null], [exchange, ETH, 2.4466E-4, 0, null]]
  
  }
  
  
  
  
  
  
  
  
  


