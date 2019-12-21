const { Square } = require("@cabezonidas/shop-ui");
const { App } = require("@cabezonidas/shop-sub-app");
const { react2angular } = require("react2angular");

angular.module("app", ["react"]);

angular
  .module("react", [])
  .component("myComponent", react2angular(Square, []))
  .component("myApp", react2angular(App, []));
