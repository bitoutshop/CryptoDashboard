function getData() {
  const configSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("configSheet");
  const dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("dataSheet");
  
  
//I assume that key and secret API are in the "Config" spreadsheet.
  const bitfinexApiKey = configSheet.getRange("B26").getValue(); 
  const bitfinexApiSecret = configSheet.getRange("B27").getValue();
  const quandlApiKey = configSheet.getRange("B37").getValue();

  
  
//clear entire dataSheet 
var rangeAll = dataSheet.getRange("A2:ZZ1000")
rangeAll.clearContent();  
SpreadsheetApp.flush();



//start dataSheet rebuild
//Push Bitfinex funds data into dataSheet a2
var bitfinexWallet = getBitfinexData(bitfinexApiKey,bitfinexApiSecret , "v2/auth/r/wallets");  //Logger.log(bitfinexWallet) 19-07-24 14:54:57:394 AEST] [[funding, BTC, 5.2E-7, 0, null], [funding, USD, 23112.82365959, 0, null],
 for (var i = 0; i < bitfinexWallet.length; i++) 
                            {  
                              var start = i + 2              
                                       dataSheet.getRange("a" + start).setValue(bitfinexWallet[i][0]);  
                                       dataSheet.getRange("b" + start).setValue(bitfinexWallet[i][1]);
                                       dataSheet.getRange("c" + start).setValue(bitfinexWallet[i][2]);   
                             };
                            
  
  
//Get bitfinexLedgerUSD Proffits array  
var bitfinexLedgerUSD = getBitfinexData(bitfinexApiKey , bitfinexApiSecret , "v2/auth/r/ledgers/USD/hist" ); //Logger.log(bitfinexLedgerUSD) [19-07-24 11:20:49:268 AEST] [[2.42242503E9, USD, null, 1.563845401E12, null, 8.90254243, 23103.73002852, null, Margin Funding Payment on wallet funding], 
 for (var i = 0; i < bitfinexLedgerUSD.length; i++) 
                            {  
                              var start = i + 2       
                                       dataSheet.getRange("d" + start).setValue(bitfinexLedgerUSD[i][1]);
                                       dataSheet.getRange("e" + start).setValue(bitfinexLedgerUSD[i][5]);
                                       dataSheet.getRange("f" + start).setValue(bitfinexLedgerUSD[i][6]);
                             };                               
                            

//Get BTC History from Quandl API and put it in dataSheet h2  
dataSheet.getRange("h2").setValue('=importdata("https://www.quandl.com/api/v3/datasets/BCHARTS/OKCOINUSD.csv?start_date=2017-07-01&end_date=9999-06-30&api_key='+(quandlApiKey)+'")');
  
// Get Funding Rates from Bitfinex 
dataSheet.getRange("q2").setValue('=importjson("https://api.bitfinex.com/v1/lendbook/USD?limit_bids=1&limit_asks=6")');
dataSheet.getRange("q12").setValue('=importjson("https://api.bitfinex.com/v1/lendbook/btc?limit_bids=1&limit_asks=6")');
dataSheet.getRange("q23").setValue('=importjson("https://api.bitfinex.com/v1/lendbook/neo?limit_bids=1&limit_asks=6")');
  
//Build Spot Prices
dataSheet.getRange("aa2").setValue('=importhtml("http://www.xe.com/currencycharts/?from=AUD&to=USD","table",1)');
dataSheet.getRange("ad2").setValue('=importhtml("https://www.bitfinex.com/stats","table",1)'); 
  
  
}



  

  
  
  
  
