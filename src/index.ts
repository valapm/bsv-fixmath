/**
 * These implementations mirror the Bitcoin Script based implementations used.
 * They are necessary to ensure that we produce the same results as the oracles.
 */

export const precision = 64
export const scale = 2 ** precision
export const bigIntScale = BigInt(scale)

const ln2 = BigInt(Math.round((Math.log(10) * scale) / Math.log2(10)))
const ln10 = BigInt(Math.round((Math.log10(10) * scale) / Math.log2(10)))
const log2e = BigInt(Math.round(Math.log2(Math.E) * 2 ** 64))
export const e = BigInt(Math.round(Math.E * scale))

/**
 * Calculates the binary exponent of x using the binary fraction method.
 * Accepts and returns scaled by 2**64 (64-bit fixed-point number).
 * Adapted from https://github.com/paulrberg/prb-math
 */
export function exp2(x: bigint): bigint {
  if (x > 3541774862152233910272n) throw new Error("exp2 above max value") // 192 max value
  if (x < -1103017633157748883456n) throw new Error("exp2 below min value") // -59.794705707972522261 min value

  // Start from 0.5 in the 192.64-bit fixed-point format.
  let result = 0x800000000000000000000000000000000000000000000000n
  // let result = 0x1000000000000000000000000n // 2**96

  // Multiply the result by root(2, 2^-i) when the bit at position i is 1. None of the intermediary results overflows
  // because the initial result is 2^191 and all magic factors are less than 2^65.
  if ((x & 0x8000000000000000n) > 0n) {
    result = (result * 0x16a09e667f3bcc909n) >> 64n
  }
  if ((x & 0x4000000000000000n) > 0n) {
    result = (result * 0x1306fe0a31b7152dfn) >> 64n
  }
  if ((x & 0x2000000000000000n) > 0n) {
    result = (result * 0x1172b83c7d517adcen) >> 64n
  }
  if ((x & 0x1000000000000000n) > 0n) {
    result = (result * 0x10b5586cf9890f62an) >> 64n
  }
  if ((x & 0x800000000000000n) > 0n) {
    result = (result * 0x1059b0d31585743aen) >> 64n
  }
  if ((x & 0x400000000000000n) > 0n) {
    result = (result * 0x102c9a3e778060ee7n) >> 64n
  }
  if ((x & 0x200000000000000n) > 0n) {
    result = (result * 0x10163da9fb33356d8n) >> 64n
  }
  if ((x & 0x100000000000000n) > 0n) {
    result = (result * 0x100b1afa5abcbed61n) >> 64n
  }
  if ((x & 0x80000000000000n) > 0n) {
    result = (result * 0x10058c86da1c09ea2n) >> 64n
  }
  if ((x & 0x40000000000000n) > 0n) {
    result = (result * 0x1002c605e2e8cec50n) >> 64n
  }
  if ((x & 0x20000000000000n) > 0n) {
    result = (result * 0x100162f3904051fa1n) >> 64n
  }
  if ((x & 0x10000000000000n) > 0n) {
    result = (result * 0x1000b175effdc76ban) >> 64n
  }
  if ((x & 0x8000000000000n) > 0n) {
    result = (result * 0x100058ba01fb9f96dn) >> 64n
  }
  if ((x & 0x4000000000000n) > 0n) {
    result = (result * 0x10002c5cc37da9492n) >> 64n
  }
  if ((x & 0x2000000000000n) > 0n) {
    result = (result * 0x1000162e525ee0547n) >> 64n
  }
  if ((x & 0x1000000000000n) > 0n) {
    result = (result * 0x10000b17255775c04n) >> 64n
  }
  if ((x & 0x800000000000n) > 0n) {
    result = (result * 0x1000058b91b5bc9aen) >> 64n
  }
  if ((x & 0x400000000000n) > 0n) {
    result = (result * 0x100002c5c89d5ec6dn) >> 64n
  }
  if ((x & 0x200000000000n) > 0n) {
    result = (result * 0x10000162e43f4f831n) >> 64n
  }
  if ((x & 0x100000000000n) > 0n) {
    result = (result * 0x100000b1721bcfc9an) >> 64n
  }
  if ((x & 0x80000000000n) > 0n) {
    result = (result * 0x10000058b90cf1e6en) >> 64n
  }
  if ((x & 0x40000000000n) > 0n) {
    result = (result * 0x1000002c5c863b73fn) >> 64n
  }
  if ((x & 0x20000000000n) > 0n) {
    result = (result * 0x100000162e430e5a2n) >> 64n
  }
  if ((x & 0x10000000000n) > 0n) {
    result = (result * 0x1000000b172183551n) >> 64n
  }
  if ((x & 0x8000000000n) > 0n) {
    result = (result * 0x100000058b90c0b49n) >> 64n
  }
  if ((x & 0x4000000000n) > 0n) {
    result = (result * 0x10000002c5c8601ccn) >> 64n
  }
  if ((x & 0x2000000000n) > 0n) {
    result = (result * 0x1000000162e42fff0n) >> 64n
  }
  if ((x & 0x1000000000n) > 0n) {
    result = (result * 0x10000000b17217fbbn) >> 64n
  }
  if ((x & 0x800000000n) > 0n) {
    result = (result * 0x1000000058b90bfcen) >> 64n
  }
  if ((x & 0x400000000n) > 0n) {
    result = (result * 0x100000002c5c85fe3n) >> 64n
  }
  if ((x & 0x200000000n) > 0n) {
    result = (result * 0x10000000162e42ff1n) >> 64n
  }
  if ((x & 0x100000000n) > 0n) {
    result = (result * 0x100000000b17217f8n) >> 64n
  }
  if ((x & 0x80000000n) > 0n) {
    result = (result * 0x10000000058b90bfcn) >> 64n
  }
  if ((x & 0x40000000n) > 0n) {
    result = (result * 0x1000000002c5c85fen) >> 64n
  }
  if ((x & 0x20000000n) > 0n) {
    result = (result * 0x100000000162e42ffn) >> 64n
  }
  if ((x & 0x10000000n) > 0n) {
    result = (result * 0x1000000000b17217fn) >> 64n
  }
  if ((x & 0x8000000n) > 0n) {
    result = (result * 0x100000000058b90c0n) >> 64n
  }
  if ((x & 0x4000000n) > 0n) {
    result = (result * 0x10000000002c5c860n) >> 64n
  }
  if ((x & 0x2000000n) > 0n) {
    result = (result * 0x1000000000162e430n) >> 64n
  }
  if ((x & 0x1000000n) > 0n) {
    result = (result * 0x10000000000b17218n) >> 64n
  }
  if ((x & 0x800000n) > 0n) {
    result = (result * 0x1000000000058b90cn) >> 64n
  }
  if ((x & 0x400000n) > 0n) {
    result = (result * 0x100000000002c5c86n) >> 64n
  }
  if ((x & 0x200000n) > 0n) {
    result = (result * 0x10000000000162e43n) >> 64n
  }
  if ((x & 0x100000n) > 0n) {
    result = (result * 0x100000000000b1721n) >> 64n
  }
  if ((x & 0x80000n) > 0n) {
    result = (result * 0x10000000000058b91n) >> 64n
  }
  if ((x & 0x40000n) > 0n) {
    result = (result * 0x1000000000002c5c8n) >> 64n
  }
  if ((x & 0x20000n) > 0n) {
    result = (result * 0x100000000000162e4n) >> 64n
  }
  if ((x & 0x10000n) > 0n) {
    result = (result * 0x1000000000000b172n) >> 64n
  }
  if ((x & 0x8000n) > 0n) {
    result = (result * 0x100000000000058b9n) >> 64n
  }
  if ((x & 0x4000n) > 0n) {
    result = (result * 0x10000000000002c5dn) >> 64n
  }
  if ((x & 0x2000n) > 0n) {
    result = (result * 0x1000000000000162en) >> 64n
  }
  if ((x & 0x1000n) > 0n) {
    result = (result * 0x10000000000000b17n) >> 64n
  }
  if ((x & 0x800n) > 0n) {
    result = (result * 0x1000000000000058cn) >> 64n
  }
  if ((x & 0x400n) > 0n) {
    result = (result * 0x100000000000002c6n) >> 64n
  }
  if ((x & 0x200n) > 0n) {
    result = (result * 0x10000000000000163n) >> 64n
  }
  if ((x & 0x100n) > 0n) {
    result = (result * 0x100000000000000b1n) >> 64n
  }
  if ((x & 0x80n) > 0n) {
    result = (result * 0x10000000000000059n) >> 64n
  }
  if ((x & 0x40n) > 0n) {
    result = (result * 0x1000000000000002cn) >> 64n
  }
  if ((x & 0x20n) > 0n) {
    result = (result * 0x10000000000000016n) >> 64n
  }
  if ((x & 0x10n) > 0n) {
    result = (result * 0x1000000000000000bn) >> 64n
  }
  if ((x & 0x8n) > 0n) {
    result = (result * 0x10000000000000006n) >> 64n
  }
  if ((x & 0x4n) > 0n) {
    result = (result * 0x10000000000000003n) >> 64n
  }
  if ((x & 0x2n) > 0n) {
    result = (result * 0x10000000000000001n) >> 64n
  }
  if ((x & 0x1n) > 0n) {
    result = (result * 0x10000000000000001n) >> 64n
  }

  // We're doing two things at the same time:
  //
  //   1. Multiply the result by 2^n + 1, where "2^n" is the integer part and the one is added to account for
  //      the fact that we initially set the result to 0.5. This is accomplished by subtracting from 191
  //      rather than 192.
  //   2. Convert the result to the unsigned 60.18-decimal fixed-point format.
  //
  // This works because 2^(191-ip) = 2^ip / 2^191, where "ip" is the integer part "2^n".
  result = result << 64n
  result = result >> (191n - (x >> 64n))

  return result // Scaled to 64 bits fixed-point number
}

/**
 * Accepts and returns scaled by 2**64 (64-bit fixed-point number).
 */
export function exp(x: bigint): bigint {
  if (x > 2454971259878909673472n) throw new Error("exp above max value") // Max value is 133.084258667509499441
  if (x < -764553562531197616128n) throw new Error("exp below min value") // Min value is -41.446531673892822322

  return exp2((x * log2e) >> 64n)
}

/**
 * Finds the zero-based index of the first one in the binary representation of x.
 * Accepts numbers scaled by 2**64 (64-bit fixed-point number).
 * Adapted from https://github.com/paulrberg/prb-math
 */
export function mostSignificantBit(x: bigint): number {
  let msb = 0

  if (x >= 2n ** 128n) {
    x = x >> 128n
    msb += 128
  }
  if (x >= 2n ** 64n) {
    x = x >> 64n
    msb += 64
  }
  if (x >= 2n ** 32n) {
    x = x >> 32n
    msb += 32
  }
  if (x >= 2n ** 16n) {
    x = x >> 16n
    msb += 16
  }
  if (x >= 2n ** 8n) {
    x = x >> 8n
    msb += 8
  }
  if (x >= 2n ** 4n) {
    x = x >> 4n
    msb += 4
  }
  if (x >= 2n ** 2n) {
    x = x >> 2n
    msb += 2
  }
  if (x >= 2n ** 1n) {
    // No need to shift x any more.
    msb += 1
  }

  return msb
}

/**
 * Calculates the binary logarithm of x.
 * Accepts and returns scaled by 2**64 (64-bit fixed-point number).
 * Only works for x greater then 1 << 64 (log2(1)).
 * Adapted from https://github.com/paulrberg/prb-math
 */
export function log2(x: bigint): bigint {
  if (x < bigIntScale) {
    throw new Error()
  }

  // Calculate the integer part of the logarithm and add it to the result and finally calculate y = x * 2^(-n).
  let n = mostSignificantBit(x / bigIntScale)

  // The integer part of the logarithm as a signed 59.18-decimal fixed-point number. The operation can't overflow
  // because n is maximum 255, bigIntScale is 1e18 and sign is either 1 or -1.
  let result = BigInt(n) * bigIntScale

  // This is y = x * 2^(-n).
  let y = x >> BigInt(n)

  // If y = 1, the fractional part is zero.
  if (y == bigIntScale) {
    return result
  }

  // Calculate the fractional part via the iterative approximation.
  // The "delta >>= 1" part is equivalent to "delta /= 2", but shifting bits is faster.
  for (let i = 1; i <= precision; i++) {
    y = (y * y) / bigIntScale

    // Is y^2 > 2 and so in the range [2,4)?
    if (y >= bigIntScale << 1n) {
      // Add the 2^(-m) factor to the logarithm.
      let delta = bigIntScale >> BigInt(i)
      result += delta

      // Corresponds to z/2 on Wikipedia.
      y = y >> 1n
    }
  }
  return result
}

export function log(x: bigint): bigint {
  return (log2(x) * ln2) / bigIntScale
}

export function log10(x: bigint): bigint {
  return (log2(x) * ln10) / bigIntScale
}

export function sqrt(x: bigint): bigint {
  return exp2(log2(x) / 2n)
}

export function root(x: bigint, base: bigint): bigint {
  return exp2((log2(x) << 64n) / base)
}

export function pow(base: bigint, exp: bigint): bigint {
  return exp2((exp * log2(base)) >> 64n)
}
