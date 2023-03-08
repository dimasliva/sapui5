sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
    "use strict"
    return Controller.extend("sap.ui.demo.controller.Detail", {
        onInit: function () {
            let oRouter = this.getOwnerComponent().getRouter()
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this)
        },
        onNavBack: function () {
          let oHistory = History.getInstance()
          let sPreviousHash = oHistory.getPreviousHash()

          if (sPreviousHash) {
              window.history.go(-1)
          } else {
              let oRouter = this.getOwnerComponent().getRouter()
              oRouter.navTo("overview", {},true)
          }
      },
        _onObjectMatched: function (oEvent) {
            let oPath = window.decodeURIComponent(oEvent.getParameter("arguments").id)

            this.getView().bindElement({
                path: "/" + oPath,
                model: "products"
            })
            console.log(oPath)
            this._getMoreVideoInfo(oPath)
        },
      _getMoreVideoInfo: function (oPath) {
        const oView = this.getView()
        let oPathIndex = oPath.split("/")[1]
        let clickedItem = oView.getModel("products").getData().products[oPathIndex]
          console.log(clickedItem)
          oView.setModel(
          new JSONModel(clickedItem),
          "item"
        )
      }
    })
})