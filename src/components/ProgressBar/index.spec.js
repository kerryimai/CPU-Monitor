import React from "react";
import ProgressBar from "./";
import { shallow } from "enzyme";

it("renders", () => {
  const wrapper = shallow(<ProgressBar label={5} />);
  expect(wrapper.html()).toMatchSnapshot();
});
