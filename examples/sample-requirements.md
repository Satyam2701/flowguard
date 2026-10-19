# Sample Requirements: Password Reset

> **Illustrative data.** This is a fictional product requirement created to demonstrate FlowGuard. It does not describe a real product.

## Feature

Product: Example banking web app
Module: Password reset
Primary user: A signed-out customer who has forgotten their password.

## User story

As a customer who forgot my password, I want to reset it using my registered email, so that I can sign in again without contacting support.

## Requirements

- **R01** The sign-in screen shows a "Forgot password?" link that opens the reset request screen.
- **R02** The reset request screen asks for the registered email address.
- **R03** If the email field is empty or not a valid email format, show an inline error and keep the user on the screen.
- **R04** After a valid email is submitted, always show the same confirmation message ("If an account exists, we sent a link"), whether or not the account exists, to avoid revealing registered emails.
- **R05** The reset link in the email expires after 30 minutes and can be used only once.
- **R06** Opening an expired or already used link shows an explanation and a way to request a new link.
- **R07** The new password screen enforces: at least 12 characters, at least one number, and it must not match the previous password.
- **R08** The user can show or hide the password while typing.
- **R09** If the password update fails because of a server error, show an error and let the user retry without retyping the password.
- **R10** After a successful reset, show a success screen with a "Sign in" button. All other active sessions are signed out.
- **R11** The user can cancel from the reset request screen and return to sign in.

## Acceptance criteria (excerpt)

- Given a valid email, when the user submits, then the confirmation screen appears within the normal loading pattern.
- Given an expired link, when the user opens it, then they see the expired-link screen with "Send a new link".
- Given a server error on update, when the user taps "Try again", then the request is retried with the same password.

## Out of scope

- SMS-based reset.
- Account recovery when the user no longer has access to their email.
