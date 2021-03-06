// Copyright (c) 2020 Jarret Dyrbye
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php


const Uuid = require("moneysocket").Uuid;
const Timestamp = require("moneysocket").Timestamp;
const Wad = require("moneysocket").Wad;

const ProviderStack = require('moneysocket').ProviderStack;
const ConsumerStack = require('moneysocket').ConsumerStack;


var Receipts = [
    {'receipt_id':  Uuid.uuidv4(),
     'time':        Timestamp.getNowTimestamp(),
     'type':        'outgoing_bolt11',
     'bolt11':      'lnbcasdfasdfasd',
     'description': 'Sparkshot.io 300px: burp!',
     'value':       Wad.bitcoin(1000000),
    },
    {'receipt_id': Uuid.uuidv4(),
     'time':       Timestamp.getNowTimestamp(),
     'type':       'socket_session',
     'txs':        [{'socket_txid': Uuid.uuidv4(),
                     'direction':  'outgoing',
                     'status':     'settled',
                     'bolt11':     'lnbcasdfasdfasdlfajlsd',
                     'value':      Wad.bitcoin(123000),
                    },
                    {'socket_txid': Uuid.uuidv4(),
                     'direction':  'incoming',
                     'status':     'settled',
                     'bolt11':     'lnbc2342334',
                     'value':      Wad.bitcoin(22000),
                    },
                   ],
    },
    {'receipt_id':  Uuid.uuidv4(),
     'time':        Timestamp.getNowTimestamp(),
     'type':        'incoming_bolt11',
     'description': null,
     'value':       Wad.bitcoin(444444),
    },
    {'receipt_id':  Uuid.uuidv4(),
     'time':        Timestamp.getNowTimestamp(),
     'type':        'outgoing_bolt11',
     'bolt11':      'lnbcasdfasdfasd',
     'description': 'Jukebox Play: C.R.E.A.M. - Wu Tang Clan ',
     'value':       Wad.bitcoin(6150),
    },
];


class CostanzaModel {
    constructor() {
        this.receipts = Receipts;
        this.provider_stack = this.setupProviderStack();
        this.consumer_stack = this.setupConsumerStack();
    }

    setupProviderStack() {
        var s = new ProviderStack();
        s.onannounce = (function(nexus) {
            this.providerOnAnnounce(nexus);
        }).bind(this);
        s.onrevoke = (function(nexus) {
            this.providerOnRevoke(nexus);
        }).bind(this);
        s.onstackevent = (function(layer_name, nexus, status) {
            this.providerOnStackEvent(layer_name, nexus, status);
        }).bind(this);
        s.handleinvoicerequest = (function(msats, request_uuid) {
            this.providerHandleInvoiceRequest(msats, request_uuid);
        }).bind(this);
        s.handlepayrequest = (function(bolt11, request_uuid) {
            this.providerHandlePayRequest(bolt11, request_uuid);
        }).bind(this);
        s.handleproviderinforequest = (function() {
            return this.handleProviderInfoRequest();
        }).bind(this);
        return s;
    }

    setupConsumerStack() {
        var s = new ConsumerStack();
        s.onannounce = (function(nexus) {
            this.consumerOnAnnounce(nexus);
        }).bind(this);
        s.onrevoke = (function(nexus) {
            this.consumerOnRevoke(nexus);
        }).bind(this);
        s.onproviderinfo = (function(provider_info) {
            this.consumerOnProviderInfo(provider_info);
        }).bind(this);
        s.onstackevent = (function(layer_name, nexus, status) {
            this.consumerOnStackEvent(layer_name, nexus, status);
        }).bind(this);
        s.onping = (function(msecs) {
            this.consumerOnPing(msecs);
        }).bind(this);
        s.oninvoice = (function(bolt11, request_reference_uuid) {
            this.consumerOnInvoice(bolt11, request_reference_uuid);
        }).bind(this);
        s.onpreimage = (function(preimage, request_reference_uuid) {
            this.consumerOnPreimage(preimage, request_reference_uuid);
        }).bind(this);
        return s;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Consumer Stack Callbacks
    ///////////////////////////////////////////////////////////////////////////

    consumerOnAnnounce(nexus) {
    }

    consumerOnRevoke(nexus) {
    }

    consumerOnStackEvent(layer_name, nexus, status) {
    }

    consumerOnProviderInfo(provider_info) {
    }

    consumerOnPing(msecs) {
    }

    consumerOnInvoice(bolt11, request_reference_uuid) {
    }

    consumerOnPreimage(preimage, request_reference_uuid) {
    }

    ///////////////////////////////////////////////////////////////////////////
    // Provider Stack Callbacks
    ///////////////////////////////////////////////////////////////////////////

    providerOnAnnounce(nexus) {
    }

    providerOnRevoke() {
    }

    providerOnStackEvent(layer_name, nexus, status) {
    }

    providerHandleInvoiceRequest(msats, request_uuid) {
    }

    providerHandlePayRequest(bolt11, request_uuid) {
    }

    handleProviderInfoRequest(shared_seed) {
        return {'ready': false};
    }

    ///////////////////////////////////////////////////////////////////////////
    // call-ins
    ///////////////////////////////////////////////////////////////////////////

    connectToWalletProvider(beacon) {
    }

    connectToAppConsumer(beacon) {
    }
}


exports.CostanzaModel = CostanzaModel;
