import { mount } from "enzyme";
import React from "react";
import { PageHeader } from "./PageHeader";

const defaultProps = {};

const render = overridingProps => {
  const props = { ...defaultProps, ...overridingProps };
  return mount(<PageHeader {...props} />);
};

it("contains component and title", () => {
  const wrapper = render();

  const header = wrapper.find(".page-header");
  expect(header.length).toEqual(1);
  expect(header.text()).toEqual("UmpClicker");
});
