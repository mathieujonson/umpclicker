import { shallow } from "enzyme";
import React from "react";
import { PageHeader } from "./PageHeader";

const defaultProps = {};

const render = overridingProps => {
  const props = { ...defaultProps, ...overridingProps };
  return shallow(<PageHeader {...props} />);
};

it("contains link and title", () => {
  const wrapper = render();

  expect(wrapper.find(".page-header").length).toEqual(1);
  expect(wrapper.find("Link").prop("to")).toEqual("/");
});
