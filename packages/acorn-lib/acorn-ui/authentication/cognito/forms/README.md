# Cognito Components

The components in this folder are basic components that simple interop with Cognito
using AWS Amplify's SDK. They can be used by anyone to build sophisticated sign in,
sign up and password management flows with no regard to any opinionated back end.

These are brought together in more opinionated components in the acorn folder
which interact with the back end to link the Cognito user with Acorn's user
model.

Each of these components are paired with a hook and in usage the result of the hook
should be spread down to satisfy the props of the component.

This allows you to replace the components themselves with relative ease.

One special component is the CogintoLoginJourney which brings together a number of the
other components into a coherent login journey for the user.
