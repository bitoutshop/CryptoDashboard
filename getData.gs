function getData() {
  const configSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("config");
  const bitfinexApiKey = configSheet.getRange("B26").getValue(); // I assume that key and secret API are in the "Config" spreadsheet. The key is in cell B26 and the secret in cell B27
  const bitfinexApiSecret = configSheet.getRange("B27").getValue();
  const dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  
//Push Bitfinex funds data into dataSheet
  var bitfinexWallet = getBitfinexWallet(bitfinexApiKey,bitfinexApiSecret);  
  for (var i = 0; i < bitfinexWallet.length; i++) 
                                     {                                                                                
                                       dataSheet.getRange("a1"+i).setValue(bitfinexWallet[i][0]);  
                                       dataSheet.getRange("b1"+i).setValue(bitfinexWallet[i][1]);
                                       dataSheet.getRange("c1"+i).setValue(bitfinexWallet[i][2]);                                  
                                     }
  
  
  
  

}
  
  
  
  
  
  
