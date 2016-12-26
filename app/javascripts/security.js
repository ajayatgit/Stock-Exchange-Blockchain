var accounts;
var account;
var marketStock = stockMarket.deployed();
var securityList= new Array();
var securityNo;



function getUrlParameter(sParam) {
  sParam = sParam.toLowerCase();
  var sPageURL = window.location.search.substring(1).toLowerCase();
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++)
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam)
    {
      return sParameterName[1];
    }
  }
}
var SNO = getUrlParameter("sno");
console.log(SNO);

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};



function retSecurityNo(){
  if(SNO!=undefined){
    marketStock.returnSecurityNo.call(SNO,{from:account}).then(function(value){
    console.log("Sno: " + value.valueOf());
    securityNo = value.valueOf();
    securityDetailList();
    return null;

    }).catch(function(e){
    console.log(e);
    setStatus("Error while getting securities.");
  });
}
};

function createSecurity(){
  var securitySymbol = document.getElementById("securitySymbol").value;
  setStatus("Security added to BlockChain. Please Wait for BlockChain to confirm....");
  marketStock.createSecurity(SNO,securitySymbol,{from:account, gas:200000}).then(function() {
    setStatus("Security added to BlockChain Successfully.");
    retSecurityNo();
    return null;
  }).catch(function(e){
    console.log(e);
    setStatus("Error while adding security to BlockChain. Please see Console.");
  });
};

function securityDetailList() {
  if(SNO!=undefined){
  var security;
  var no;
  securityList = [];
  setStatus("Please Wait. Retrieving security list BlockChain...");

  securityList.push(["Serial No.","Security"]);

  marketStock.returncreateSecurity.call(SNO,{from: account}).then (function(value) {

    for (var i=0;i<securityNo;i++){

        console.log(value[0][i].valueOf());
        console.log(value[1][i].valueOf());
        no = value[0][i].valueOf();
        security = value[1][i].valueOf();
        var securities = hex_to_ascii(security);
        securityList.push([no,securities]);
    }

    console.log(securityList);
    GenerateTable1();
    setStatus("");
    return null;

    }).catch(function(e){
      console.log(e);
      setStatus("Error while getting security list.");
  });

}
};

function hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
};

function GenerateTable1() {
    //Create a HTML Table element.
    if(SNO!=undefined){
    var table = document.createElement("TABLE");
    table.className = "table table-striped";


    //Get the count of columns.
    var columnCount = securityList[0].length;

    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = securityList[0][i];
        row.appendChild(headerCell);

    }

    //Add the data rows.
    for (var i = 1; i < securityList.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = securityList[i][j];
        }
    }

    var dvTable = document.getElementById("dvTable1");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}
}

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
    retSecurityNo();
  });
}
