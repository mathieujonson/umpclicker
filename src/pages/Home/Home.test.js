import { mount } from "enzyme";
import React from "react";
import { Home } from "./Home";

const defaultProps = {};

const render = overridingProps => {
  const props = { ...defaultProps, ...overridingProps };
  return mount(<Home {...props} />);
};

describe("Home page content", () => {
  const wrapper = render();

  it("has the correct className", () => {
    expect(wrapper.find(".home").length).toEqual(1);
  });

  it("contains the title", () => {
    expect(wrapper.find("h1").text()).toEqual("Ready for the game?");
  });

  it("contains the button", () => {
    expect(wrapper.find("button").text()).toEqual("Play Ball!");
  });
});
