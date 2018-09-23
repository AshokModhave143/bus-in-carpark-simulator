'use strict';
/**
 * The Messenger class.
 * @param {object} config Messenger configuration
 */
const Messenger = function (config) {
    this._config = config || {};

    /**
     * Instruction for messenger what message need to show
     * @param {object} data input message object e.g. {msg: 'messageKey', ...}
     * @returns {string} - parsed text message
     * @public
     */
    this.getMessage = (data) => {
        /**
         * If no parameter provided return 
         * default 'welcome' message 
         */
        if(!data) {
            return this._config.outMessages.welcome;
        }

        /**
         * If no key found in message config, return default message
         */
        if(!this._config.outMessages[data.msg]) {
            return this._config.outMessages['welcome'];
        }
        return this._constructMessage(data);
    };

    /**
     * Parse the messages from config file
     * @param {object} data - message object e.g {msg: 'messageKey',...}
     * @returns {string} - parsed string message
     * @private
     */
    this._constructMessage = (data) => {
        const cMsg = Object.assign({}, data, this._config.outSubMsg);        
        let str = this._config.outMessages[cMsg.msg].replace(/{(\w+)}/g, (match, p) => {
            return cMsg[p];
        });
        return str;
    };
};

module.exports = Messenger;