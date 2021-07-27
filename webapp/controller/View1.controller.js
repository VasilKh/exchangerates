sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"exchangerates/model/formatter",
	'sap/ui/model/Filter'
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */

function (Controller, formatter, Filter) {
	"use strict";

	var currency = '';
	var dateFrom = new Date();
	var dateTo = new Date();
	var oModel;
	

	return Controller.extend("exchangerates.controller.View1", {		
		formatter: formatter,

		onInit: function(evt) {
			var sUrl = "/sap/opu/odata/sap/ZVK_I_ERATE_UI/";
			oModel = new sap.ui.model.odata.ODataModel(sUrl, {
				useBatch: false
			});

			var oFilter = new Filter("CurrencyKey",sap.ui.model.FilterOperator.EQ,currency);

			this.getView().setModel(oModel);

			this.getView().byId("idVizFrame").getDataset().getBinding("data").filter([oFilter]);
	
		},

		onDateChoose(oEvent){
			dateFrom = oEvent.getParameters().from;
			dateFrom.setDate(dateFrom.getDate() + 1);
			dateTo = oEvent.getParameters().to;
		},

		onCurrencyChoose(oEvent){
			currency = oEvent.getParameters().value;
		},

		onSyncronize: function(oEvent){
			oModel.callFunction('synchronization', { urlParameters:{
				Currencykey : currency},
				method:'POST'
				})
		},

		onSearch: function (oEvent){

		/* 	oModel.callFunction('synchronization', { urlParameters:{
				Currencykey : currency},
				method:'POST'
				}); */
			/* var oFilter = [
				new Filter("CurrencyKey", "EQ", currency),
				new Filter("ERDate", "BT", dateFrom, dateTo),
			];
			oModel.read("/ZVK_CDS_ERATES", {
				filters : oFilter,
			}); */

			var oFilter = new Filter("CurrencyKey",sap.ui.model.FilterOperator.EQ,currency);
			var oFilter2 = new Filter("ERDate",sap.ui.model.FilterOperator.BT, dateFrom, dateTo);

			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVK_I_ERATE_UI");
			this.getView().setModel(oModel);

			this.getView().byId("idVizFrame").getDataset().getBinding("data").filter([oFilter, oFilter2]);
		},



	});
});