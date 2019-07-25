//Grab data from Bitfinex API
  function getBitfinexData(bitfinexApiKey , bitfinexApiSecret , path ) {     
   
    
    function bytesToHex(data) {
        return data.map(function(e) {
            var v = (e < 0 ? e + 256 : e).toString(16);
            return v.length == 1 ? "0" + v : v;
        }).join("");
    }
    const nonce = Date.now().toString();
    const body = { "type": "price" };
    const rawBody = JSON.stringify(body);
    var signature = "/api/" + path + nonce + rawBody;
    signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_384, signature, bitfinexApiSecret);
    signature = bytesToHex(signature);
    const url = "https://api.bitfinex.com/" + path;
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
    Logger.log(data);
   
  return data; 
  
  }
  
  
  
  
  
  
  
  
  


