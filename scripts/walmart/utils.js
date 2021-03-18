let selectors = new Map();
selectors.set('account_selector', '#hf-account-flyout > span > span > span.b_a.ab_b.b_g.b_b.b_p.x_a.x_h.x_i');
selectors.set('account_information_selector', '#vh-account-menu-root > div.p_a.p_o');
selectors.set('email_selector', '#email');
selectors.set('password_selector', '#password');
selectors.set('singin_selector', '#sign-in-form > button.button.m-margin-top.text-inherit');
selectors.set('sold_out_selector', '#blitzitem-container');
selectors.set('add_cart_bttn_selector', '#add-on-atc-container > div:nth-child(1) > section > div.valign-middle.display-inline-block.prod-product-primary-cta.primaryProductCTA-marker > div.prod-product-cta-add-to-cart.display-inline-block > button > span');
selectors.set('chekout_bttn_selector_1', '#cart-root-container-content-skip > div > div > div.text-left.Grid > div.Grid-col.u-size-1.u-size-3-12-m.u-size-3-12-l > div > div > div.cart-pos-main-actions.s-margin-top.cart-pos-checkout-button > div > div > button.button.ios-primary-btn-touch-fix.hide-content-max-m.checkoutBtn.button--primary');
selectors.set('chekout_bttn_selector_2', 'body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(1) > div > div.CXO_module_body.ResponsiveContainer > div > div > div > div.text-left.Grid > div > div > div.CXO_fulfillment_continue > button');
selectors.set('chekout_bttn_selector_3', 'body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(2) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > div.text-left.Grid > div > div > div > div > div.arrange > div.arrange-fill.u-size-1-12-m > button');
selectors.set('cvv_panel_selector', 'body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(3) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > div.text-left.Grid > div:nth-child(2) > div > div > div > div.text-left.Grid > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div.card-body.clearfix');
selectors.set('cvv_input_selector', '#cvv-confirm');
selectors.set('review_bttn_selector', 'body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div > div:nth-child(3) > div.CXO_module_container > div.CXO_module_body.ResponsiveContainer > div > div > div > div.text-left.Grid > div:nth-child(2) > div > button');
selectors.set('place_order_bttn_selector', 'body > div.js-content > div > div.checkout-wrapper > div > div.accordion-inner-wrapper > div.checkout-accordion > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div > div.Grid-col.u-size-1.u-size-3-12-s.u-size-3-12-m > div > form > div > button');

module.exports = {
    selectors,
}