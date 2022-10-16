const { buildContractClass, compileContract } = require("scryptlib")

const FixMath = buildContractClass(compileContract("test/testFixMath.scrypt"))
const fixMath = new FixMath()

test("log", () => {
  const result = fixMath.testLog().verify()
  expect(result.success).toBe(true)
})

test("exp", () => {
  const result = fixMath.testExp().verify()
  expect(result.success).toBe(true)
})
