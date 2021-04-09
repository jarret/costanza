// Copyright (c) 2021 Moneysocket Developers
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php


const D = require('../../utl/dom.js').DomUtl;
const I = require('../../utl/icon.js').IconUtl;

const PERSIST_PROFILE = require("../../model/persist.js").PERSIST_PROFILE;

const Screen = require('./screen.js').Screen;


class StorageSettingsScreen extends Screen {
    constructor(app_div, model) {
        super(app_div, model);

        this.model = model;
        this.app_div = app_div;
        this.onbackclick = null;
        this.onprofilechange = null;
        this.onclearclick = null;

        this.title_string = "Storage Settings:";
    }

    ///////////////////////////////////////////////////////////////////////////
    // Buttons
    ///////////////////////////////////////////////////////////////////////////

    drawSelectButton(div, select_func) {
        this.drawButtonPlain(div, "Use", select_func, "secondary-button");
    }

    drawClearButton(div, clear_func) {
        this.drawButtonPlain(div, "Clear", clear_func, "secondary-button");
    }


    doSelect(profile) {
        if (this.onprofilechange != null) {
            this.onprofilechange(profile);
        }
    }

    doClear(profile) {
        if (this.onclearclick != null) {
            this.onclearclick(profile);
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    // Panels
    ///////////////////////////////////////////////////////////////////////////

    drawInfoPanel(div) {
        var [profile, checkout_record] = this.model.getStorageSettings();
        var flex = D.emptyDiv(div,
                              "flex flex-col section-background");

        D.textParagraph(flex, "Currently Using:", "text-gray-300");
        var p;
        switch(profile) {
        case PERSIST_PROFILE.ONE:
            p = "Profile 1"
            break;
        case PERSIST_PROFILE.TWO:
            p = "Profile 2"
            break;
        case PERSIST_PROFILE.THREE:
            p = "Profile 3"
            break;
        }
        D.textParagraph(flex, p, "font-bold text-gray-300");

        var profile1 = D.emptyDiv(flex, "flex justify-around items-center " +
                                "bg-gray-800 py-1 m-2 rounded");
        D.textSpan(profile1, "Profile 1 In Use: ", "text-gray-300");
        D.textSpan(profile1,
                   checkout_record[PERSIST_PROFILE.ONE] ? "True" : "False",
                   "px-8 text-2xl font-bold text-gray-300");
        this.drawSelectButton(profile1,
                              (function() {
            this.doSelect(PERSIST_PROFILE.ONE)}).bind(this));
        this.drawClearButton(profile1,
                              (function() {
            this.doClear(PERSIST_PROFILE.ONE)}).bind(this));

        var profile2 = D.emptyDiv(flex, "flex justify-around items-center " +
                                "bg-gray-800 py-1 m-2 rounded");
        D.textSpan(profile2, "Profile 2 In Use: ", "text-gray-300");
        D.textSpan(profile2,
                   checkout_record[PERSIST_PROFILE.TWO] ? "True" : "False",
                   "px-8 text-2xl font-bold text-gray-300");
        this.drawSelectButton(profile2,
                              (function() {
            this.doSelect(PERSIST_PROFILE.TWO)}).bind(this));
        this.drawClearButton(profile2,
                             (function() {
            this.doClear(PERSIST_PROFILE.TWO)}).bind(this));

        var profile3 = D.emptyDiv(flex, "flex justify-around items-center " +
                                "bg-gray-800 py-1 m-2 rounded");
        D.textSpan(profile3, "Profile 3 In Use: ", "text-gray-300");
        D.textSpan(profile3,
                   checkout_record[PERSIST_PROFILE.THREE] ? "True" : "False",
                   "px-8 text-2xl font-bold text-gray-300");
        this.drawSelectButton(profile3,
                              (function() {
            this.doSelect(PERSIST_PROFILE.THREE)}).bind(this));
        this.drawClearButton(profile3,
                              (function() {
            this.doClear(PERSIST_PROFILE.THREE)}).bind(this));
    }

    ///////////////////////////////////////////////////////////////////////////
    // Screens
    ///////////////////////////////////////////////////////////////////////////

    draw() {
        var flex = this.screenDiv();
        var flex_top = D.emptyDiv(flex, "flex-none");
        this.drawTitlePanel(flex_top);

        var flex_mid = D.emptyDiv(flex, "flex-grow");
        this.drawInfoPanel(flex_mid);
        var flex_bottom = D.emptyDiv(flex, "flex-none");
    }
}

exports.StorageSettingsScreen = StorageSettingsScreen;
