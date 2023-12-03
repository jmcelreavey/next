# Cypress (w/ Obsidian Framework)

## Setup

To begin using Cypress follow the below steps

1. Navigate to the `obsidian` directory: `cd obsidian`
2. Install dependencies: `npm install`

## Running Cypress

Cypress can be ran either as a GUI (headed) or CLI (headless). Before running Cypress, ensure you have the project running.

- GUI: `npx cypress open`
  - Select 'E2E Testing'
  - Select the `.feature` file
  - See the tests run
- CLI: `npx cypress run`
  - Use ` --config video=false` to disable video recording (performance increase)
  - Use ` --env tags=@{tag}` to only run tests with the `@{tag}` tag such as `@passing`
  - Use `--spec` flag to only run a specific directory/file
    - Example: `npx cypress run --spec cypress/tests/smoke-tests/smoke.feature`

## File Navigation

There are three primary files when working with Cypress, these are:

- Tests (`cypress/tests`)
- Step Definitions (`cypress/step-definitions`)
- Fixtures (`cypress/fixtures`)

#### Tests & Step Definitions

Tests hold the `.feature` files, which are written in Gherkin (Given-When-Then) steps. Step definitions hold the `.ts` files which link up the Gherkin steps to the definition, performing the automation.

The file structure between the two will be mirrored, with only the sub-directory (tests||step-definitions) being the changing factor.

```
cypress/
├─ step-definitions/
│  ├─ smoke-tests/
│  │  ├─ example.ts
├─ tests/
│  ├─ smoke-tests/
│  │  ├─ example.feature
```

#### Fixtures

The `cypress/fixtures` directory is used to hold the assets for testing (documents/images) as well as being the home for Page Objects and Records.

## Further Information

- [Cypress](https://docs.cypress.io/api/table-of-contents)
- [Obsidian](https://app.gitbook.com/o/WBMGqczDwgSZ2vCtuijr/s/pnliJHSLDj4oaCY2kAkX/)
