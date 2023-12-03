const fs = require("fs");
const process = require("process");

// Terminal Colours
var Reset = "\x1b[0m";
var FgRed = "\x1b[31m";
var FgGreen = "\x1b[32m";
var FgYellow = "\x1b[33m";
var FgCyan = "\x1b[36m";

var featureText =
  "Feature: {}\n\n\tScenario: [System] - Reset data\n\t\tGiven I have freshly seeded data\n";
var stepDefinitionText = 'import { Given, When, Then, And, } from "@gcdtech/obsidian";';

function invalidUsage() {
  console.log(FgRed);
  console.log("Oops, something went wrong! Try again...", FgCyan);
  console.log("Usage:", Reset, "npm run add 01-001-epic-name 01-032-feature-name", FgCyan);
  console.log(
    "This will create:",
    Reset,
    "tests/00-001-epic-name/00-032-feature-name.feature\n\t\t   step-definitions/00-001-epic-name/00-032-feature-name.js"
  );
  console.log(Reset);
}

function assignVariables(input) {
  var epicName;
  var featureNames = new Array();

  epicName = input[2];

  // Loops over the input, assigning all the feature names
  for (let i = 0; i < input.length; i++) {
    if (i <= 2) {
      continue;
    }
    featureNames.push(input[i]);
  }

  return { epicName, featureNames };
}

function createDirectories(vars) {
  // Loops over all potential features named
  vars.featureNames.forEach((featureName) => {
    console.log(FgCyan, "\nWorking on: ", Reset, featureName, FgYellow);
    console.log("Creating feature file...");

    // Creates the test directory and feature file
    fs.mkdir(process.cwd() + "/cypress/tests/" + vars.epicName, { recursive: true }, (err) => {
      if (!err) {
        fs.writeFile(
          process.cwd() + "/cypress/tests/" + vars.epicName + "/" + featureName + ".feature",
          featureText.replace("{}", featureName),
          { flag: "a" },
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      }
      if (err) {
        console.log(Reset);
        console.error(err);
        return;
      }
    });

    console.log("Creating typescript file...");

    // Creates the step definition directory and ts file
    fs.mkdir(
      process.cwd() + "/cypress/step-definitions/" + vars.epicName,
      { recursive: true },
      (err) => {
        if (!err) {
          fs.writeFile(
            process.cwd() +
              "/cypress/step-definitions/" +
              vars.epicName +
              "/" +
              featureName +
              ".ts",
            stepDefinitionText,
            { flag: "a" },
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
            }
          );
        }
        if (err) {
          console.log(Reset);
          console.error(err);
          return;
        }
      }
    );

    return true;
  });
}

function addCmd(input) {
  if (input.length <= 3) {
    invalidUsage();
    return;
  }

  vars = assignVariables(input);
  resp = createDirectories(vars);

  if (resp == false) {
    console.log(Reset);
    return;
  }

  console.log(FgGreen);
  console.log(
    "Successfully added " +
      vars.featureNames.length +
      "/" +
      vars.featureNames.length +
      " directories",
    Reset
  );
}

addCmd(process.argv);
