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
        href="https://www.linkedin.com/in/matthew-johnson-1294b796/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Matthew Johnson
      </a>
    </span>
  </footer>
);
