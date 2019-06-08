import { mount } from "enzyme";
import React from "react";
import { Home } from "./Home";

const defaultProps = {};

const render = overridingProps => {
  const props = { ...defaultProps, ...overridingProps };
  return mount(<Home {...props} />);
};

it("has the correct className", () => {
  const wrapper = render();

  expect(wrapper.find(".home").length).toEqual(1);
});
