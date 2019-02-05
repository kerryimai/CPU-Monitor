import React from "react";
import { shallow } from "enzyme";
import calculateTwoMinAverage from "./calculateTwoMinAverage";
import "babel-polyfill";

it("should accurately calculate two minute average", () => {
  expect(
    calculateTwoMinAverage([
      { foo: 0 },
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      { foo: 6 }
    ])
  ).toEqual(3);
});

it("should return -1 for short lists", () => {
  expect(calculateTwoMinAverage([])).toEqual(-1);
  expect(calculateTwoMinAverage([[], [], [], [], [], []])).toEqual(-1);
});
