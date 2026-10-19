# Checkout requirements (fixture, fictional)

- R01 Users can check out as a guest or signed in.
- R02 Signed-in users see saved addresses; guests enter an address.
- R03 Promo codes: valid codes apply a discount; invalid or expired codes show a specific message.
- R04 Payment methods: card, UPI, cash on delivery (COD).
- R05 COD is unavailable for orders above 10,000 and must show why.
- R06 If an item goes out of stock during checkout, show which item and let the user remove it or go back to the cart.
- R07 UPI: show "Waiting for approval in your UPI app"; if not approved within 5 minutes, show a timeout with "Try again" or "Choose another method".
- R08 Card failures show the reason and allow retry.
- R09 Success shows the order confirmation.
