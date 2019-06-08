import React from "react";
import "./pageFooter.scss";

export const PageFooter = () => (
  <footer className="page-footer">
    <span>
      Photo by{" "}
      <a
        href="https://unsplash.com/@eduardobal?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
        target="_blank"
        rel="noopener noreferrer"
      >
        Eduardo Balderas
      </a>
    </span>
    <span>
      Website by{" "}
      <a
        href="https://twitter.com/mathieujonson"
        target="_blank"
        rel="noopener noreferrer"
      >
        mathieujonson
      </a>
    </span>
  </footer>
);
