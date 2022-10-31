# bsv-fixmath

Fixed-point implementations of exp, log, root and pow for Bitcoin SV.
This repo contains two equivalent implementations, one in Typescript and one in sCrypt that compiles to Bitcoin Script.

Install with `npm install bsv-fixmath`.

## Getting started

Convert your numbers to 64-bit fixed-point integers:

```typescript
const fixedNum = BigInt(num * 2 ** 64);
```

```sCrypt
int fixedNum = num << 64;
```

Here are all functions exposed by the library:

```typescript
import {
  exp2,
  exp,
  mostSignificantBit,
  log2,
  log,
  log10,
  sqrt,
  root,
  pow,
} from "bsv-fixmath";

const fixedResult = exp(fixedNum);
const result = Number(fixedResult) / 2 ** 64;
```

```sCrypt
import "./fixMath.scrypt";

int fixedResult = FixMath.exp(fixedNum);
int result = fixedResult >> 64;
```
