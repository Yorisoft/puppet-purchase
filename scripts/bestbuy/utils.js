let selectors = new Map();
selectors.set('pickUp_bttn_selector', 'div.fulfillment-add-to-cart-button');
selectors.set('add_cart_bttn_selector', 'button.c-button.c-button-primary.c-button-lg.c-button-block.c-button-icon.c-button-icon-leading.add-to-cart-button');
selectors.set('account_selector', 'li.bottom-nav-menu-item');
selectors.set('zip_input_selector', '.zip-code-input');
selectors.set('pick_store_selector', 'button.c-button.c-button-outline.c-button-sm.make-this-your-store');
selectors.set('lookup_bttn_selector', 'button.c-button.c-button-secondary.c-button-md');
selectors.set('email_selector', 'input#fld-e.tb-input');
selectors.set('password_selector', 'input#fld-p1.tb-input');
selectors.set('singin_selector', 'div.cia-form__controls');
selectors.set('chekout_bttn_selector_1', 'button.btn.btn-lg.btn-block.btn-primary');
selectors.set('chekout_bttn_selector_2', 'button.btn.btn-lg.btn-block.btn-primary.button__fast-track');
selectors.set('proceed_to_checkout', '#checkoutApp > div.page-spinner.page-spinner--out > div:nth-child(1) > div.checkout.large-view > main > div.checkout__container > div.checkout__col.checkout__col--primary > form > section > div > div:nth-child(2) > div > div > button');
selectors.set('cvv_panel_selector', 'div.checkout-panel payment-card');
selectors.set('cvv_bttn_selector', 'input#credit-card-cvv.form-control.credit-card-form__cvv--warn');

module.exports = {
    selectors,
}