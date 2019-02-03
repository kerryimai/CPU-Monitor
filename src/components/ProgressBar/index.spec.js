import React from "react";
import ProgressBar from "./";
import { shallow } from "enzyme";

it("renders", () => {
  const wrapper = shallow(<ProgressBar />);
  expect(wrapper.html()).toMatchSnapshot();
});
