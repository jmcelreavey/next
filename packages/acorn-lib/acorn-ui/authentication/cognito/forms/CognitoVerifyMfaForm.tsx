import { Form, Formik } from "formik";
import { Alert, Button, ButtonBar, FormActions } from "morse-react";
import { object, string } from "yup";
import { LabelledInput } from "../../../forms/LabelledInput/LabelledInput";
import type { WithCancelCallback } from "../hooks/withCancelCallback";
import { CognitoMfaMethod } from "../types";

export interface CognitoVerifyMfaFormProps extends WithCancelCallback {
  /**
   * Handle the verification of the TOTP
   * @param totp
   */
  handleVerifyTotp?: (totp: string) => Promise<boolean>;

  /**
   * Stores any general submission error
   */
  submissionError?: string;

  /**
   * The methods by which the application and Cognito agree should be supported.
   */
  mfaMethod?: CognitoMfaMethod;
}

/**
 * Presents the form displayed to a user when they must verify their acc
 * @param props
 * @returns
 */
export const CognitoVerifyMfaForm = (props: CognitoVerifyMfaFormProps) => {
  return (
    <div className="ac-cognito ac-cognito-setup-mfa">
      {props.submissionError && (
        <Alert data-label="form-submission-error">{props.submissionError}</Alert>
      )}

      {props.mfaMethod !== CognitoMfaMethod.Totp ? (
        <Alert data-label="form-configuration-error">
          Sorry, this authentication pool only supports SMS multi factor authentication. This login
          journey only supports Software TOTP style multi factor authentication
        </Alert>
      ) : (
        <Formik
          initialValues={{ totp: "" }}
          onSubmit={(values) => props.handleVerifyTotp?.(values.totp)}
          validationSchema={object().shape({
            totp: string().required("Enter the code visible on your authentication app or device."),
          })}
        >
          {({ isSubmitting }) => (
            <Form className="c-form" autoComplete="off">
              <LabelledInput
                name="totp"
                label="Enter the 6 digit One Time Password presented on your device."
              />

              <FormActions>
                <ButtonBar className="+stacked">
                  <Button type="submit" busy={isSubmitting} data-label="verify-account">
                    Verify One Time Password
                  </Button>
                  {props.handleCancel && (
                    <Button
                      type="button"
                      onClick={() => props.handleCancel?.()}
                      data-label="cancel"
                    >
                      Go back
                    </Button>
                  )}
                </ButtonBar>
              </FormActions>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
