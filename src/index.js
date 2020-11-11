const readline = require("readline");

const { probabilityForKey, recover } = require("./utils.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let missingCharacters;

console.log(
  `Insert your private key.\nIn the missing characters replace with '*' or '?': `
);

rl.on("line", async (answer) => {
  missingCharacters = answer.match(/\*|\?/g);

  probabilityForKey(answer);

  if (!missingCharacters || missingCharacters.length !== 7) {
    console.log(
      "\nYour private key must have 7 missing characters!\nInsert it again:"
    );
  } else {
    recover(answer);

    rl.close();
  }
});

// rl.on('line', (input) => {
//   console.log(`Received: ${input}`);
// });
