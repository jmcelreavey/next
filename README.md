# README

## The Core Stack

- [Next.js](https://nextjs.org) - React Framework
- [NextAuth.js](https://next-auth.js.org) - Authentication
- [Prisma](https://prisma.io) - Database ORM
- [Morse](https://gcdtech.gitlab.io/morse/) - UI Framework
- [Acorn](https://gcdtech.gitlab.io/internal/acorn/) - UI Component Library
- [tRPC](https://trpc.io) - RPC Framework (GraphQL Alternative)
- [Vitest](https://vitest.dev/) - Testing Framework
- [CapacitorJS](https://capacitorjs.com/) - Mobile App Framework

## Getting Started

Ensure you're on node 20. First, run the development server:

```bash
yarn install
yarn dev
```

If you run into any issues, it might be worth deleting the entire project and cloning it down again.

## Site URLs

- [Client Site](http://localhost:3005)
- [Admin Site](http://localhost:3010)

## Development

There's a few things to be aware of before developing within the McCausland project:

1. We work on a storybook first approach, all components must be developed within Storybook first.
2. We strive to ensure all backend logic is unit tested.
3. Commits go straight to the current sprint brach, we don't create sub-branches.
   1. This means commits should be taking place every few hours and do not break the build for everyone else.

## Environment Variables

If you want to use Google OAuth you will need to create a project in the
[Google Developer Console](https://console.developers.google.com/) and create a set of
credentials for your project.

You can also simply log in with a seeded email address and password, the default is `admin@gcdtech.com` or `user@gcdtech.com`
Passcode is 1234

## Seeding the Database

You can seed the database with the following command:

```bash
yarn db:seed # or yarn workspace customer-site / admin-site db:seed
```

**Note:** This command is ran by default during the `yarn customer-site` command.

## Debugging

You can debug the application with vscode by running the `Debug Application` launch configuration.

## Running Tests

You can run the tests with the following command:

```bash
yarn test
```

We use Vitest for our testing framework, you can learn more about it [here](https://vitest.dev/).

## Running Linting

You can run the linting with the following command:

```bash
yarn lint # or yarn workspace customer-site / admin-site lint
```

We use ESLint for our linting framework, you can learn more about it [here](https://eslint.org/).

## Integration Testing

You can run the integration tests with the following command:

```bash
yarn cypress
```

## Deployment

You can deploy the application with the following command:
Ensure you have the AWS CLI installed and configured with the correct credentials.

```bash
yarn install
yarn db:generate
AWS_PROFILE=mccausland-staging yarn deploy-staging
# AWS_PROFILE=mccausland-production yarn deploy-production
```

After a deployment it's important to check the out.txt file in the gitlab pipeline to ensure no errors have occurred. If errors have
occurred or for some reason you want to access the databas remotely you can create an SSH tunnel using the following commands:

```bash
ssh -i ~/.ssh/id_ed25519 -N -L 3307:production-sst-next-main.cluster-cfbgwdqkztec.eu-west-2.rds.amazonaws.com:3306 jmcelreavey@ssh.gcd.tech
```

Replacing the credentials with your own and the host with the correct host. After you've done this update the .env file for the DATABASE_URL
to contain the database username, password, correct db name and port 3307.

## Storybook

You can run Storybook with the following command:

```bash
yarn storybook
```

Build storybook with the following command:

```bash
yarn build-storybook
```

## Prisma

You can run Prisma commands with the following command:

```bash
yarn db # or yarn workspace customer-site db
```

Some useful commands are:

```bash
yarn db:generate # Generates your Prisma client
yarn db:push # Pushes your schema to the database
yarn db:seed # Seeds the database with data
yarn db:studio # Opens the Prisma Studio
yarn db:nuke # Wipe the database
```

## CapacitorJS

You can create a new build of the customer site with the following command:

```bash
yarn workspace customer-site capacitor:sync-staging # This will update the android and ios to match the latest build
# yarn workspace customer-site capacitor:sync-production # This will update the android and ios to match the latest build
```

You can then open the project in Android Studio or XCode and run the application on a device or emulator with the following command:

```bash
yarn workspace customer-site capacitor:android # OR yarn workspace customer-site capacitor:ios
```
