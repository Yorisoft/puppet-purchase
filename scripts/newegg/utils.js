let selectors = new Map();
selectors.set('pickUp_bttn_selector', 'div#ProductBuy.product-buy');
selectors.set('outOfStock_selector', 'div.product-inventory');
selectors.set('securityCode_selector', 'div:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(4) > td');
selectors.set('securityCode_input_selector', 'div.form-v-code input');
selectors.set('inbox_selector', 'html body div div div div div div div div div div div div div div div div div div div table tbody tr');
selectors.set('inbox_singin_selector', 'button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc');
selectors.set('inbox_email_selector', 'input#identifierId.whsOnd.zHQkBf');
selectors.set('inbox_password_selector', 'input.whsOnd.zHQkBf');
selectors.set('singin_selector_1', 'button#signInSubmit.btn.btn-orange');
selectors.set('email_selector', 'input#labeled-input-signEmail');
selectors.set('password_selector', 'input#password.sc-iwsKbI.eAChmV.sc-kIPQKe.frLPpE');
selectors.set('chekout_bttn_selector_1', 'button.btn.btn-primary.btn-wide');
selectors.set('checkout_bttns', 'button.btn.btn-primary.checkout-step-action-done.layout-quarter');
selectors.set('cvv_bttn_selector', 'input.form-text.mask-cvv-4');
selectors.set('placeOrder_selector', 'button#btnCreditCard.btn.btn-primary.btn-wide');

module.exports = {
    selectors,
}