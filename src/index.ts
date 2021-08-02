import { IBankDetails } from './interfaces/BankDetails';
import BankCCIArray from './constants/BankCCI.json';

export const getBankFromCCI = (bankIdentifier: string) => {
  return BankCCIArray.find((BankCCI) =>  BankCCI.id === bankIdentifier)?.name;
}

export const getDetailsFromCCI = (cci: string): IBankDetails => {
  if (!cci.match(/[0-9]{20}/)) {
    throw new Error('CCI must be numeric and have exactly 20 digits');
  }

  const bankIdentifier = cci.substring(0, 3);
  const bank = getBankFromCCI(bankIdentifier);

  if (!bank) {
    throw new Error("Unknown Bank Identifier");
  }

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
      } else {
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