sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("sap.ui.demo.controller.App",{incrementBy1:function(){let e=this.getView().byId("counter");let t=parseInt(e.getText());let s=t+1;e.setText(s)},onInit:function(){var e={stats:{medium:"163.3"}};var s=new t(e);let o=new t(sap.ui.require.toUrl("sap/ui/demo/Data.json"));o.attachRequestCompleted(null,function(){let t=o.getData().products;e.stats.price=t.map(e=>Number(e.price)).reduce((e,t)=>e+t);e.stats.medium=(t.map(e=>Number(e.price)).reduce((e,t)=>e+t,0)/t.length).toString().slice(0,5);console.log(e.stats.medium);this.getView().setModel(s,"stats")},this);this.getView().setModel(o,"products")},onItem:function(e){var t=e.getSource();var s=this.getOwnerComponent().getRouter();s.navTo("detail",{id:window.encodeURIComponent(t.getBindingContext("products").getPath().substr(1))});sap.m.MessageToast.show(selectedObject.price)}})});