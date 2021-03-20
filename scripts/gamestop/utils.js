let selectors = new Map();

selectors.set('singin_selector_1', 'body > div.page > div.main-header-container.sticky-header-redesign > header > nav > div.header.container.header-redesign > div > div.header-options.col-3.col-lg-auto > div.account-header > div.header-account-options.tulsa-acclink-toggle');
selectors.set('singin_selector_2', '#signIn');
selectors.set('email_selector', '#login-form-email');
selectors.set('password_selector', '#login-form-password');
selectors.set('singin_selector_3', '#signinCheck > button');
selectors.set('pickUp_bttn_selector', '#primary-details > div.primary-details-row > div.cart-and-ipay.divider-line.no-border-mobile > div.add-to-cart-buttons.tulsa-atcbutton-toggle > div > div:nth-child(1) > button');
selectors.set('cart_inventory_selector', 'body > div.page > div.main-header-container.sticky-header-redesign > header > nav > div.header.container.header-redesign > div > div.header-options.col-3.col-lg-auto > div.tulsa-minicart-toggle > div > div > div.minicart-total.hide-link-med > a > span.minicart-quantity');
selectors.set('change_store_selector', 'body > div.page > div.main-header-container.sticky-header-redesign > div > div > div > div.header-banner-utils.col-auto > div.tulsa-custlookup-toggle > div > a > span.store-name.d-none.d-lg-inline');
selectors.set('zip_input_selector', '#store-search-input');
selectors.set('pick_store_selector', '#ae-main-content > div.store-locator-search-stores-container > div > div');
selectors.set('chekout_bttn_selector_1', '#ae-main-content > div.row.cart-rd.container.m-0.p-0 > div.col-12.col-lg-3.totals.cart-rd.mt-3.mt-lg-0 > div.row.p-2.bg-white.mb-3 > div.col-12.checkout-continue-redesign.p-0.tulsa-checkoutbutton-toggle > div > a > span.checkout-btn-text-mobile');
selectors.set('chekout_bttn_selector_2', '#checkout-main > div.row.no-gutters.next-step-button.justify-content-center.workflow-button > div > div > div > button.btn.btn-primary.btn-block.submit-shipping');
selectors.set('cvv_bttn_selector', '#saved-payment-security-code');
selectors.set('chekout_bttn_selector_3', '#checkout-main > div:nth-child(2) > div.col-12.col-lg-9.mb-lg-2.left-section > div.row.no-gutters.order-summary.justify-content-end > div > div > div > div.next-step-summary-button > button.btn.btn-primary.btn-block.submit-payment');
selectors.set('place_order_selector', '#checkout-main > div:nth-child(2) > div.col-12.col-lg-3.order-summary-section.right-rail > div:nth-child(1) > div.card-body.order-total-summary > div.next-step-summary-button > form > button');


module.exports = {
    selectors,
}