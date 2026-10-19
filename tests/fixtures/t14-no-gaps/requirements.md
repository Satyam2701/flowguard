# Change email requirements (fixture, fictional)

- R01 From Account settings, the user taps "Change email".
- R02 The user enters a new email and current password.
- R03 Invalid email, same as current email, or wrong password show specific inline errors.
- R04 Show loading while submitting.
- R05 Send a verification link to the new email; show "Check your new inbox" with "Resend" and "Cancel change".
- R06 Until verified, the old email stays active and settings shows "Pending: <new email>".
- R07 Verifying the link shows "Email updated"; expired links show "Link expired" with "Send again".
- R08 Server error shows a message and "Try again" with input preserved.
