import React from "react";
import { Link } from "react-router-dom";
import "./pageHeader.scss";

export const PageHeader = () => (
  <header className="page-header">
    <Link to="/">UmpClicker</Link>
  </header>
);
