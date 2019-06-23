import { mount } from "enzyme";
import React from "react";
import { Clicker } from "./Clicker";

const defaultProps = {};

const render = overridingProps => {
  const props = { ...defaultProps, ...overridingProps };
  return mount(<Clicker {...props} />);
};

it("renders without crashing", () => {
  const wrapper = render();

  expect(wrapper.find(".clicker").length).toEqual(1);
});
