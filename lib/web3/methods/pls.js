/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/** @file pls.js
 * @authors:
 *   Carl Park <carl.p@onther.io>
 * @date 2017
 */

"use strict";

var Method = require('../method');
var Property = require('../property');
var formatters = require('../formatters');

var Pls = function (web3) {
  this._requestManager = web3._requestManager;

  var self = this;

  methods().forEach(function(method) {
    method.attachToObject(self);
    method.setRequestManager(self._requestManager);
  });

  properties().forEach(function(p) {
    p.attachToObject(self);
    p.setRequestManager(self._requestManager);
  });
};


var methods = function () {
  return [
    new Method({
      name: 'version',
      call: 'pls_version',
      params: 0
    }),
    new Method({
			name: 'getBlock',
			call: 'pls_getBlock',
      inputFormatter: [formatters.inputBlockNumberFormatter],
			params: 1
		}),
    new Method({
			name: 'getTransaction',
			call: 'pls_getTransaction',
			params: 2
		}),
    new Method({
			name: 'submitBlock',
			call: 'pls_submitBlock',
			params: 0
		}),
    new Method({
			name: 'applyTransaction',
			call: 'pls_applyTransaction',
      inputFormatter: [formatters.inputPlasmaTransactionFormatter],
			params: 1
		}),
  ];
};

var properties = function () {
  return [
    new Property({
      name: 'currentBlockNumber',
      getter: 'pls_currentBlockNumber',
    }),
  ];
};

module.exports = Pls;
