import React from "react";
import "./App.css";

const TypescriptChallengeOne = () => {
  return intToRoman(1990);
};

const TypescriptChallengeTwo = () => {
  return romanToInt("MCMXC");
};

const TypescriptChallengeThree = () => {
  return balanced("abc");
};

const intToRoman = (num: number): string => {
  const symbols = [
    { symbol: "M", value: 1000 },
    { symbol: "CM", value: 900 },
    { symbol: "D", value: 500 },
    { symbol: "CD", value: 400 },
    { symbol: "C", value: 100 },
    { symbol: "XC", value: 90 },
    { symbol: "L", value: 50 },
    { symbol: "XL", value: 40 },
    { symbol: "X", value: 10 },
    { symbol: "IX", value: 9 },
    { symbol: "V", value: 5 },
    { symbol: "IV", value: 4 },
    { symbol: "I", value: 1 },
  ];

  let result = "";

  for (let i = 0; i < symbols.length; i++) {
    while (num >= symbols[i].value) {
      result += symbols[i].symbol;
      num -= symbols[i].value;
    }
  }

  return result;
};

const romanToInt = (roman: string): number => {
  const symbols = [
    { symbol: "M", value: 1000 },
    { symbol: "CM", value: 900 },
    { symbol: "D", value: 500 },
    { symbol: "CD", value: 400 },
    { symbol: "C", value: 100 },
    { symbol: "XC", value: 90 },
    { symbol: "L", value: 50 },
    { symbol: "XL", value: 40 },
    { symbol: "X", value: 10 },
    { symbol: "IX", value: 9 },
    { symbol: "V", value: 5 },
    { symbol: "IV", value: 4 },
    { symbol: "I", value: 1 },
  ];

  let result = 0;

  for (let i = 0; i < symbols.length; i++) {
    while (roman.startsWith(symbols[i].symbol)) {
      result += symbols[i].value;
      roman = roman.slice(symbols[i].symbol.length);
    }
  }

  return result;
};

const allWildcards = (s: string): boolean => {
  let n = s.length;
  for (let i = 1; i < n; i++) if (s[i] !== s[0]) return false;

  return true;
};

const countUniqueChars = (s: string): number => {
  const charSet = new Set();

  for (let i = 0; i < s.length; i++) {
    charSet.add(s[i]);
  }
  return charSet.size;
};

export const balanced = (s: string): boolean => {
  if (s === "" || s.length === 1 || s.length === 2 || allWildcards(s)) {
    return true;
  }

  if (s.length > 500000) {
    return false;
  }

  const hasWildcards = s.includes("*");
  const uniqueChars = countUniqueChars(s.split("*").join("")); //try .replaceAll
  const charCounts: { [char: string]: number } = {};
  let maxCount = 0;

  for (const char of s) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }

  for (const char in charCounts) {
    if (char !== "*" && charCounts[char] > maxCount) {
      maxCount = charCounts[char];
    }
  }

  if (hasWildcards) {
    for (const char in charCounts) {
      if (char !== "*" && charCounts[char] !== maxCount) {
        if (charCounts[char] < maxCount) {
          const wildcardsNeeded = maxCount - charCounts[char];

          if (charCounts["*"] < wildcardsNeeded) {
            return false;
          }

          charCounts["*"] -= wildcardsNeeded;
          charCounts[char] += wildcardsNeeded;
        }
      }
    }
  } else {
    for (const char in charCounts) {
      if (charCounts[char] !== maxCount) {
        return false;
      }
    }
  }

  let wildcardsRemaining = charCounts["*"];
  let availableChars = 52 - uniqueChars;

  if (hasWildcards && wildcardsRemaining !== 0) {
    if (wildcardsRemaining >= maxCount) {
      const fits = Number.isInteger(wildcardsRemaining / uniqueChars);

      if (fits) {
        return true;
      } else if (!fits) {
        //Edgecase scenarios. I'm not proud of this code, needs refactoring.
        const canStillBeDistributed = wildcardsRemaining - uniqueChars;

        if (canStillBeDistributed > 0) {
          for (const char in charCounts) {
            if (char !== "*") {
              charCounts[char]++;
              charCounts["*"]--;
            }
          }

          maxCount++;
          wildcardsRemaining = charCounts["*"];

          if (
            wildcardsRemaining % 2 === 0 &&
            wildcardsRemaining / 2 === maxCount
          ) {
            return true;
          }

          if (wildcardsRemaining === maxCount && availableChars === maxCount) {
            return true;
          }
        }
        //End of edgecase scenarios

        if (wildcardsRemaining === maxCount && uniqueChars !== 52) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  if (charCounts["*"] < maxCount && charCounts["*"] > 0) {
    return false;
  }

  return true;
};

function App() {
  return (
    <>
      <div>{TypescriptChallengeOne()}</div>
      <div>{TypescriptChallengeTwo()}</div>
      <div>{TypescriptChallengeThree().toString()}</div>
    </>
  );
}

export default App;
