// Copyright (c) 2021 Moneysocket Developers
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php

const D = require('../../utl/dom.js').DomUtl;
const I = require('../../utl/icon.js').IconUtl;

const Screen = require('./screen.js').Screen;


class ErrorScreen extends Screen {
    constructor(app_div) {
        super(app_div);

        this.app_div = app_div;
        this.onokclick = null;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Panels
    ///////////////////////////////////////////////////////////////////////////

    drawErrorPanel(div, err_str) {
        var flex = D.emptyDiv(div, "flex-col section-background");
        var icon_flex = D.emptyDiv(flex, "text-gray-300 py-4");
        I.exclaimcircle2x(icon_flex);
        var text_flex = D.emptyDiv(flex, "text-gray-300");
        D.textParagraph(text_flex, "Error: " + err_str, "text-center py-10");
        var button_flex = D.emptyDiv(flex, "px-2 py-4");

        this.drawBackButton(button_flex, this.onokclick);
    }

    ///////////////////////////////////////////////////////////////////////////
    // Screens
    ///////////////////////////////////////////////////////////////////////////

    draw(err_str) {
        var flex = this.screenDiv();
        var flex_top = D.emptyDiv(flex, "flex-none h-10");
        var flex_mid = D.emptyDiv(flex, "flex-grow ");
        var flex_bottom = D.emptyDiv(flex, "flex-none h-10");

        this.drawErrorPanel(flex_mid, err_str);
    }
}

exports.ErrorScreen = ErrorScreen;
