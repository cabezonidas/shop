import React from "react";
import { Global, css } from "@emotion/core";

export const globalStyle = (
  <Global
    styles={css`
      /* Reset */
      * {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        vertical-align: baseline;
      }

      ol,
      ul {
        list-style: none;
      }

      a[class],
      a[class]:visited,
      a[class]:hover {
        text-decoration: none;
      }

      a:not([class]) {
        color: inherit;
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      @import url("https://fonts.googleapis.com/css?family=Fira+Sans:300,400,700");
      html {
        font-size: 0.875rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
          "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
      }
    `}
  />
);
