import { Form, Formik } from "formik";
import { Alert, Button, ButtonBar, FormActions } from "morse-react";
import { object, ref, string } from "yup";
import { LabelledInput } from "../../../forms/LabelledInput/LabelledInput";
import type { CognitoChangePasswordBehaviours } from "../hooks/useCognitoChangePassword";
import type { PasswordPolicyItems } from "../types";
import { PasswordPolicy } from "./PasswordPolicy";

interface ResetSubmission { oldPassword: string; password: string; confirmPassword: string }

export interface CognitoChangePasswordFormProps extends CognitoChangePasswordBehaviours {
  /**
   * Sets the text for the Reset Button
   */
  resetButtonText?: string;

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
 * Presents a change password form
 * @param props
 * @returns
 */
export const CognitoChangePasswordForm = (props: CognitoChangePasswordFormProps) => {
  return (
    <div className="ac-cognito ac-cognito-change-password">
      {props.submissionError && <Alert>{props.submissionError}</Alert>}

      <Formik<ResetSubmission>
        initialValues={{ password: "", confirmPassword: "", oldPassword: "" }}
        onSubmit={(values) => {
          return props.handleResetPassword(values.oldPassword, values.password);
        }}
        validationSchema={object().shape({
          oldPassword: string().required("Enter your old password"),
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
              name="oldPassword"
              inputProps={{
                type: "password",
              }}
            />
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
                <Button busy={isSubmitting} data-label="confirm-reset-password">
                  {props.resetButtonText ?? "Reset my password"}
                </Button>
                {props.handleCancel && (
                  <Button data-label="cancel" type="button" onClick={() => props.handleCancel?.()}>
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
