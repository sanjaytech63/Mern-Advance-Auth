import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates";
import { mailtrapClient, sender } from "./mailtrap.config";

interface Recipient {
  email: string;
}

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  const recipient: Recipient[] = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
  } catch (error: unknown) {
    console.error("Error sending verification email", error);
    throw new Error(
      `Error sending verification email: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<void> => {
  const recipient: Recipient[] = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to Auth Company!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name)
      .replace(
        "{loginURL}",
        "http://localhost:5173/login"
      ),
    });
  } catch (error: unknown) {
    console.error("Error sending welcome email", error);
    throw new Error(
      `Error sending welcome email: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
): Promise<void> => {
  const recipient: Recipient[] = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error: unknown) {
    console.error("Error sending password reset email", error);
    throw new Error(
      `Error sending password reset email: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const sendResetSuccessEmail = async (email: string): Promise<void> => {
  const recipient: Recipient[] = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
  } catch (error: unknown) {
    console.error("Error sending password reset success email", error);
    throw new Error(
      `Error sending password reset success email: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
