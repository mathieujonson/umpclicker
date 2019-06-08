import { mount } from "enzyme";
import React from "react";
import App from "./App";

const defaultProps = {};

const render = overridingProps => {
  const props = { ...defaultProps, ...overridingProps };
  return mount(<App {...props} />);
};

it("contains the proper components", () => {
  const wrapper = render();

  expect(wrapper.find(".page-header").length).toEqual(1);
});
