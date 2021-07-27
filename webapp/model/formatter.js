sap.ui.define([], function () {
	"use strict";
            return {
 
                dateFormat : function (fValue) {
                    return sap.ui.core.format.DateFormat.getDateTimeInstance({ pattern: "dd-MM-yyyy" }).format(new Date(fValue));
                }
                /* 
                decimalFormat : function (fValue) {
                    return sap.ui.core.format.NumberFormat.getCurrencyInstance({"decimals": 2}).format(new fValue);
                } */
            };
        
});