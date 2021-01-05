let selectors = new Map();
selectors.set('pickUp_bttn_selector', 'div.fulfillment-add-to-cart-button');
selectors.set('add_cart_bttn_selector', 'button.btn.btn-primary.btn-lg.btn-block.btn-leading-ficon.add-to-cart-button');
selectors.set('account_selector', 'li.utility-navigation-list-item');
selectors.set('zip_input_selector', '.zip-code-input');
selectors.set('pick_store_selector', 'button.btn.btn-outline.btn-sm.make-this-your-store');
selectors.set('lookup_bttn_selector', 'button.btn.btn-secondary.btn-sm');
selectors.set('email_selector', 'input#fld-e.tb-input');
selectors.set('password_selector', 'input#fld-p1.tb-input');
selectors.set('chekout_bttn_selector_1', 'button.btn.btn-lg.btn-block.btn-primary');
selectors.set('chekout_bttn_selector_2', 'button.btn.btn-lg.btn-block.btn-primary.button__fast-track');
selectors.set('cvv_panel_selector', 'div.checkout-panel payment-card');
selectors.set('cvv_bttn_selector', 'input#credit-card-cvv.form-control.credit-card-form__cvv--warn');

module.exports = {
    selectors,
}