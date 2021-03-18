let selectors = new Map();
selectors.set('singin_selector_1', '#utility');
selectors.set('google_signin_selector', '#ctl00_ContentLeftSide_ucLogin_pnlExternalLogin > div.oam_loginReturningLine > div.google-login');
selectors.set('inbox_email_selector', 'input#identifierId.whsOnd.zHQkBf');
selectors.set('inbox_password_selector', 'input.whsOnd.zHQkBf');
selectors.set('singin_selector_2', '#identifierNext > div > button');
selectors.set('singin_selector_3', 'button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc');
selectors.set('inventory_count', '#pnlInventory > p > span');
selectors.set('add_to_cart_selector', '#options-button > form > input.btn-add.grey.big.STBTN');
selectors.set('chekout_bttn_selector_1', '#ContentPlaceHolder1_ucOrderSummary_lbCheckout');
selectors.set('grand_total_selector', '#ucOrderSummary_pnlSummary > div > div:nth-child(2) > div');
selectors.set('phone_number_input_selector', '#ucCheckOut_rlvBillingAddress_ctrl0_txtPhoneNumber');
selectors.set('review_bttn_selector', '#ucCheckOut_btnContinue');
selectors.set('chekout_bttn_selector_2', '#ucOrderSummary_lbSubmitOrder');
selectors.set('cvv_bttn_selector', '#ucCheckOut_txtCCCsv');

module.exports = {
    selectors,
}