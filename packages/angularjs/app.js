const { Square } = require("@cabezonidas/shop-ui");
const { react2angular } = require("react2angular");

angular.module("app", ["components"]);

angular.module("components", []).component("myComponent", react2angular(Square, []));
