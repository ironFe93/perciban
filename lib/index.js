"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetailsFromCCI = exports.getBankFromCCI = void 0;
const BankCCI_json_1 = __importDefault(require("./constants/BankCCI.json"));
const getBankFromCCI = (cci) => {
    var _a;
    if (!cci.match(/[0-9]{20}/)) {
        throw new Error('CCI must be numeric and have exactly 20 digits');
    }
    const bankIdentifier = cci.substring(0, 3);
    const bank = (_a = BankCCI_json_1.default.find((BankCCI) => BankCCI.id === bankIdentifier)) === null || _a === void 0 ? void 0 : _a.name;
    if (!bank) {
        throw new Error("Unknown Bank Identifier");
    }
    return bank;
};
exports.getBankFromCCI = getBankFromCCI;
const getDetailsFromCCI = (cci) => {
    const bank = exports.getBankFromCCI(cci);
    switch (bank) {
        case "BCP":
            const accountTypeDigit = cci.substring(6, 7);
            if (accountTypeDigit === '1') {
                // Ahorro
                return {
                    bank,
                    accountNumber: cci.substring(3, 6) + cci.substring(7, 18),
                    cci,
                    currency: cci.substring(15, 16) === '0' ? 'PEN' : 'USD',
                    type: 'Ahorro',
                };
            }
            else {
                // Cuenta Corriente
                return {
                    bank,
                    accountNumber: cci.substring(3, 6) + cci.substring(8, 18),
                    cci,
                    currency: cci.substring(15, 16) === '0' ? 'PEN' : 'USD',
                    type: 'Corriente',
                };
            }
        case "INTERBANK":
            return {
                bank,
                accountNumber: cci.substring(3, 6) + cci.substring(8, 18),
                cci,
            };
        case "BBVA":
            return {
                bank,
                accountNumber: `00110${cci.substring(3, 6)}${cci.substring(8, 18)}`,
                cci,
            };
        case "SCOTIABANK":
            return {
                bank,
                accountNumber: cci.substring(3, 6) + cci.substring(11, 18),
                cci,
            };
        case "BANBIF":
            return {
                bank,
                accountNumber: '0' + cci.substring(7, 18),
                cci,
            };
        case "MI BANCO":
            return {
                bank,
                accountNumber: cci.substring(8, 18),
                cci,
            };
        case 'BANCO DE LA NACION':
            return {
                bank,
                accountNumber: cci.substring(7, 18),
                cci,
            };
        default:
            throw new Error('Unknown Bank Identifier');
    }
};
exports.getDetailsFromCCI = getDetailsFromCCI;
