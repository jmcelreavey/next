import { Form, Formik } from "formik";
import { Alert, Button, ButtonBar, FormActions, Icon } from "morse-react";
import { object, string } from "yup";
import { LabelledInput } from "../../../forms/LabelledInput/LabelledInput";
import type { CognitoChallengeCommunicationMethod } from "../types";

export interface CognitoConfirmUserFormProps {
  /**
   * Stores any general error
   */
  submissionError?: string;
  /**
   * Confirm the user with an entered code
   * @param code The validation code from the users email
   */
  handleConfirmUser: (code: string) => Promise<boolean>;
  /**
   * Allow resending of the code
   */
  handleRequestCode: () => Promise<boolean>;
  /**
   * Handle what happens if the user cancels
   *
   * Optional - if not present the cancel button will not appear
   * @returns
   */
  handleCancel?: () => void;
  /**
   * True if a code has been recently resent
   */
  resentSignUpCode?: boolean;

  /**
   * Provides context as to how the user can find their confirmation code.
   */
  challengeCommunicationMethod?: CognitoChallengeCommunicationMethod;
}

/**
 * Presents the form displayed to a user when they must verify their acc
 * @param props
 * @returns
 */
export const CognitoConfirmUserForm = (props: CognitoConfirmUserFormProps) => {
  return (
    <div className="ac-cognito ac-cognito-confirm-user">
      {props.submissionError && (
        <Alert data-label="form-submission-error">{props.submissionError}</Alert>
      )}
      {props.challengeCommunicationMethod && (
        <p className="c-alert +align-start">
          We've sent you a code via {props.challengeCommunicationMethod.medium} to{" "}
          {props.challengeCommunicationMethod.destination}
        </p>
      )}
      <Formik
        initialValues={{ code: "" }}
        onSubmit={(values) => props.handleConfirmUser(values.code)}
        validationSchema={object().shape({
          code: string().required(
            "Enter the code you received. If you haven't received, you can request a new one below."
          ),
        })}
      >
        {({ isSubmitting }) => (
          <Form className="c-form" autoComplete="off">
            <LabelledInput name="code" />

            <FormActions>
              <ButtonBar className="+stacked">
                <Button type="submit" busy={isSubmitting} data-label="verify-account">
                  Verify Account
                </Button>
                {props.handleCancel && (
                  <Button type="button" onClick={() => props.handleCancel?.()} data-label="cancel">
                    Go back
                  </Button>
                )}
              </ButtonBar>
              {props.submissionError && (
                <Alert data-label="form-submission-error">{props.submissionError}</Alert>
              )}
            </FormActions>

            <div className="ac-cognito-confirm-user__resend">
              <span>Didn't receive a code?</span>

              <Button
                type="button"
                className="+subtle"
                onClick={props.handleRequestCode}
                data-label="resend-code"
              >
                Resend Code
              </Button>

              {props.resentSignUpCode && (
                <Alert data-label="form-submission-success">
                  <Icon iconName="icon-check-circle" />
                  <Alert.Text>We've sent you a new code</Alert.Text>
                </Alert>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
