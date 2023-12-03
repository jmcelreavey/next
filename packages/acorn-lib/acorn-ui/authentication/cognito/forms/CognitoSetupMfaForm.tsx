import { Form, Formik } from "formik";
import { Alert, Button, ButtonBar, FormActions } from "morse-react";
import { QRCodeSVG } from "qrcode.react";
import { object, string } from "yup";
import { LabelledInput } from "../../../forms/LabelledInput/LabelledInput";
import type { WithCancelCallback } from "../hooks/withCancelCallback";
import { CognitoMfaMethod } from "../types";

export interface CognitoSetupMfaFormProps extends WithCancelCallback {
  /**
   * Handle the verification of the TOTP
   * @param totp
   */
  handleVerifyTotp?: (totp: string) => Promise<boolean>;

  /**
   * The secret that should be displayed to the user.
   */
  secret?: string;

  /**
   * A valid Authenticator scheme URL for generating a QR code
   */
  secretQrCodeContent?: string;

  /**
   * Stores any general submission error
   */
  submissionError?: string;

  /**
   * The methods by which the application and Cognito agree should be supported.
   */
  permittedMfaMethods?: CognitoMfaMethod[];
}

/**
 * Presents the form displayed to a user when they must verify their acc
 * @param props
 * @returns
 */
export const CognitoSetupMfaForm = (props: CognitoSetupMfaFormProps) => {
  return (
    <div className="ac-cognito ac-cognito-setup-mfa">
      {props.submissionError && (
        <Alert data-label="form-submission-error">{props.submissionError}</Alert>
      )}
      {!props.permittedMfaMethods?.includes(CognitoMfaMethod.Totp) ? (
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
              <div className="u-flex u-gap u-marg-bottom u-flex-wrap">
                <div>
                  {props.secretQrCodeContent && <QRCodeSVG value={props.secretQrCodeContent} />}
                </div>
                <div>
                  <p className="u-marg-bottom">
                    Use your Authenticator app to scan this QR code. You will be required to enter
                    generated code during each login.
                  </p>
                  <p className="u-marg-bottom">
                    If you can't scan the QR code, you may be able to enter the following code into
                    your password application instead:
                  </p>
                  <div className="c-alert +align-start">{props.secret}</div>
                </div>
              </div>

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
