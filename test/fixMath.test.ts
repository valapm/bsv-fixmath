import { exp2, exp, mostSignificantBit, log2, log, log10, sqrt, root, pow } from "../src/index"

test("exp", () => {
  const res = exp(BigInt(21.8 * 2 ** 64))
  expect(Number(res) / 2 ** 64).toBe(2935078394.23225)
})

test("log", () => {
  const res = log(BigInt(21.8 * 2 ** 64))
  expect(Number(res) / 2 ** 64).toBe(3.081909969795044)
})

test("root", () => {
  const res = root(BigInt(21.8 * 2 ** 64), BigInt(2.18 * 2 ** 64))
  expect(Number(res) / 2 ** 64).toBe(4.111221431473702)
})

test("pow", () => {
  const res = pow(BigInt(21.8 * 2 ** 64), BigInt(2.18 * 2 ** 64))
  expect(Number(res) / 2 ** 64).toBe(827.6279636544427)
})
