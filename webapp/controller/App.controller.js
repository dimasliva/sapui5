sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
   "use strict"
   return Controller.extend("sap.ui.demo.controller.App", {
      incrementBy1: function () {
         let myTextElem = this.getView().byId("counter")
         let myNum = parseInt(myTextElem.getText())
         let myNewNum = myNum + 1
         myTextElem.setText(myNewNum)
      },
      onInit: function() {
        var oStats = {
          stats : {
             medium : "163.3",
          }
        };
        var oModelStats = new JSONModel(oStats);
        let oModel = new JSONModel(
          sap.ui.require.toUrl("sap/ui/demo/Data.json")
        )
        oModel.attachRequestCompleted(null,function() {
          let products = oModel.getData().products
          oStats.stats.price = products.map(item => Number(item.price)).reduce((prev, next) => prev + next);
          oStats.stats.medium = (products.map(item => Number(item.price)).reduce((a, b) => a + b, 0) / products.length).toString().slice(0, 5);
          console.log(oStats.stats.medium); 
          this.getView().setModel(oModelStats, "stats")
        }, this);
        this.getView().setModel(oModel, "products")


      },
      onItem: function(oEvent) {
        var oItem = oEvent.getSource()
        var oRouter = this.getOwnerComponent().getRouter()
        oRouter.navTo("detail", {
          id: window.encodeURIComponent(oItem.getBindingContext("products").getPath().substr(1))
        });
        sap.m.MessageToast.show(selectedObject.price);
      }
   })
});
