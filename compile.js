const path = require("path")
const { compileContract } = require("scryptlib")

const filePath = path.join(__dirname, "scrypt/fixMath.scrypt")
const out = path.join(__dirname, "dist")

const result = compileContract(filePath, {
  out
})
