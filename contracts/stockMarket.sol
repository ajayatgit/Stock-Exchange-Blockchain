pragma solidity ^0.4.2;

contract stockMarket{
	uint snoCompany;
	uint sn;
	bytes32 cName;
	uint securityNo;

    struct _Security{
	    uint no;
	    bytes32 securitySymbol;
	}

	struct _Company{
		uint no;
		bytes32 companyName;
		mapping (uint => _Security) Securities;
	}
	mapping (uint=>_Company) Company;

	function stockMarket(){
		snoCompany = 0;
		securityNo = 0;
	}

	function returnSno() constant returns (uint){
     return (snoCompany);
    }

	function returnSecurityNo(uint snoCompany) constant returns (uint){
     return (Company[snoCompany].Securities[securityNo].no);
    }

	function addCompany(bytes32 companyName){
		snoCompany = snoCompany+1;
		Company[snoCompany] = _Company(snoCompany,companyName);
	}

	function returnAddCompany() constant returns(uint[] , bytes32[]){
		uint[] memory sn = new uint[](snoCompany);
        bytes32[] memory cName = new bytes32[](snoCompany);

    for (uint i=0;i<snoCompany;i++){

    	_Company c = Company[i+1];
      sn[i] = c.no;
      cName[i] = c.companyName;
		}
		return(sn,cName);
	}

	function createSecurity(uint snoCompany,bytes32 securitySymbol){
    Company[snoCompany].Securities[securityNo].no = Company[snoCompany].Securities[securityNo].no + 1;
    Company[snoCompany].Securities[Company[snoCompany].Securities[securityNo].no] = _Security(Company[snoCompany].Securities[securityNo].no, securitySymbol);
	}

	function returnCreateSecurity(uint snoCompany) constant returns(uint[], bytes32[]){
	    uint[] memory sn = new uint[](Company[snoCompany].Securities[securityNo].no);
        bytes32[] memory cName = new bytes32[](Company[snoCompany].Securities[securityNo].no);

        for (uint i=0;i<Company[snoCompany].Securities[securityNo].no;i++){

    	    _Security s = Company[snoCompany].Securities[i+1];
            sn[i] = s.no;
            cName[i] = s.securitySymbol;
		}
		return(sn,cName);
	}

}
