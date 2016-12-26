var accounts;
var account;
var marketStock = stockMarket.deployed();
var companyList= new Array();
var snoCompany;
function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function retSno(){
  marketStock.returnSno.call({from:account}).then(function(value){
    console.log("Sno: " + value.valueOf());
    snoCompany = value.valueOf();
    companyDetailList();
    return null;

    }).catch(function(e){
    console.log(e);
    setStatus("Error while getting companies.");
  });
};

function addCompany(){
  var companyName = document.getElementById("companyName").value;
  setStatus("Company added to BlockChain. Please Wait for BlockChain to confirm....");
  marketStock.addCompany(companyName, {from:account, gas:200000}).then(function() {
    setStatus("Company added to BlockChain Successfully.");
    retSno();
    return null;
  }).catch(function(e){
    console.log(e);
    setStatus("Error while adding company to BlockChain. Please see Console.");
  });
};

function companyDetailList() {
  var company;
  var no;
  companyList = [];
  setStatus("Please Wait. Retrieving company list BlockChain...");

  companyList.push(["Serial No.","Company Name"]);

  marketStock.returnAddCompany.call({from: account}).then (function(value) {

    for (var i=0;i<snoCompany;i++){

        console.log(value[0][i].valueOf());
        console.log(value[1][i].valueOf());
        no = value[0][i].valueOf();
        company = value[1][i].valueOf();
        var companys = hex_to_ascii(company);
        companyList.push([no,companys]);
    }

    console.log(companyList);
    GenerateTable();
    setStatus("");
    return null;

    }).catch(function(e){
      console.log(e);
      setStatus("Error while getting company list.");
  });


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

function GenerateTable() {
    //Create a HTML Table element.
    var table = document.createElement("TABLE");
    table.className = "table table-striped";


    //Get the count of columns.
    var columnCount = companyList[0].length;

    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = companyList[0][i];
        row.appendChild(headerCell);

    }

    //Add the data rows.
    for (var i = 1; i < companyList.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = '<a href="security.html?sno='+i+'">'+companyList[i][j]+'</a>';
        }
    }

    var dvTable = document.getElementById("dvTable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
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
    retSno();
  });
}
