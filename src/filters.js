import numeral from "numeral";

const dollarFilter = (value) =>
  !value ? "$ 0" : numeral(value).format("$ 0.00a");

const percentFilter = (value) =>
  !value ? "0%" : `${Number(value).toFixed(2)}%`;

export { dollarFilter, percentFilter };
