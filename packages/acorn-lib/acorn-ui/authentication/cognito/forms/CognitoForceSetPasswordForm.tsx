import { Form, Formik } from "formik";
import { Alert, Button, ButtonBar, FormActions } from "morse-react";
import { object, ref, string } from "yup";
import { LabelledInput } from "../../../forms/LabelledInput/LabelledInput";
import type { WithCancelCallback } from "../hooks/withCancelCallback";
import { PasswordPolicy } from "./PasswordPolicy";

interface ResetSubmission { password: string; confirmPassword: string }

export interface CognitoForceSetPasswordFormProps extends WithCancelCallback {
  /**
   * Stores any general error
   */
  submissionError?: string;
  /**
   *
   * @returns
   */
  handleSetPassword: (password: string) => Promise<boolean>;

  /**
   * Optionally change the default text of the reset button
   */
  resetButtonText?: string;

  /**
   *
   */
  cancelButtonText?: string;

  /**
   * Password policy items an a array of strings or PasswordPolicyItem objects.
   *
   * If strings are supplied those policies will show as a list of bullet points.
   * If PasswordPolicyItem objects are supplied the given regular expression will be used
   * to validate the password against the policy.
   */
  passwordPolicies?: PasswordPolicyItems;
}

/**
 * Displayed when Cognito insists on the password being reset before the user can login.
 */
export const CognitoForceSetPasswordForm = (props: CognitoForceSetPasswordFormProps) => {
  return (
    <div className="ac-cognito ac-cognito-force-set-password">
      {props.submissionError && (
        <Alert data-label="form-submission-error">{props.submissionError}</Alert>
      )}

      <p className="u-marg-bottom">To continue you must change your password.</p>

      <Formik<ResetSubmission>
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values) => props.handleSetPassword(values.password)}
        validationSchema={object().shape({
          password: string().required("Enter a new password"),
          confirmPassword: string()
            .when("password", {
              is: (password: string | undefined) => !!(password && password.length > 0),
              then: string().oneOf([ref("password")], "Password confirmation doesn't match"),
            })
            .required("Password confirmation doesn't match"),
        })}
      >
        {({ isSubmitting, values }) => (
          <Form className="c-form" autoComplete="off">
            <LabelledInput
              name="password"
              inputProps={{
                type: "password",
              }}
            />

            <PasswordPolicy policies={props.passwordPolicies} currentValue={values.password} />

            <LabelledInput
              name="confirmPassword"
              inputProps={{
                type: "password",
              }}
            />
            <FormActions>
              <ButtonBar className="+stacked">
                <Button busy={isSubmitting} data-label="confirm-set-password">
                  {props.resetButtonText ?? "Set my password"}
                </Button>
                {props.handleCancel && (
                  <Button type="button" onClick={() => props.handleCancel?.()} data-label="cancel">
                    Go back
                  </Button>
                )}
              </ButtonBar>
            </FormActions>
          </Form>
        )}
      </Formik>
    </div>
  );
};
