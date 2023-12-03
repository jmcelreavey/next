import type { PasswordPolicyItems } from "../types";

export const PasswordPolicy = (props: {
  policies?: PasswordPolicyItems;
  currentValue?: string;
}) => {
  if (!props.policies?.length) {
    return null;
  }

  return (
    <div data-label="password-policy">
      <p data-label="password-policy-must">Passwords must:</p>
      <ul data-label="password-policy-list">
        {props.policies.map((policy, i) => {
          if (typeof policy === "string") {
            return <li key={i}>{policy}</li>;
          }

          const policyContent = policy.policyText;
          let policyClassName = "";

          if (policy.passingRegularExpression && props.currentValue) {
            if (policy.passingRegularExpression.test(props.currentValue)) {
              policyClassName = "+passing";
            } else {
              policyClassName = "+failing";
            }
          }

          return (
            <li key={i} className={policyClassName}>
              {policyContent}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
