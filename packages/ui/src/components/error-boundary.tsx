import React, { Component } from "react";
import { TFunction, i18n } from "i18next";
import Box from "./box";

export class ErrorBoundary extends Component<{ t: TFunction; i18n: i18n }> {
  public state = {
    hasError: false,
  };

  public componentDidMount() {
    this.props.i18n.addResourceBundle(
      "en-US",
      "translation",
      { ui: { errorBoundary: { something_went_wrong: "Something went wrong" } } },
      true,
      true
    );
    this.props.i18n.addResourceBundle(
      "es-AR",
      "translation",
      { ui: { errorBoundary: { something_went_wrong: "Algo salió mal" } } },
      true,
      true
    );
  }

  public componentDidCatch() {
    this.setState({ hasError: true });
  }

  public render() {
    if (this.state.hasError) {
      return <Box>{this.props.t("ui.errorBoundary.something_went_wrong")}</Box>;
    }
    return this.props.children;
  }
}
