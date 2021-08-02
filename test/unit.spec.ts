import { getDetailsFromCCI } from '../src/index';

describe('Banking Utilities', () => {
  describe('Test \'getDetailsFromCCI\' ', () => {
    beforeAll(() => jest.clearAllMocks());

    describe('Errors', () => {
      it('should throw error if input is not numeric', () => {
        expect(() => {
          getDetailsFromCCI('abc123');
        }).toThrowError();
      });

      it('should throw error if input is numeric but length is not 20', () => {
        expect(() => {
          getDetailsFromCCI('152632');
        }).toThrowError();
      });

      it('should throw error if input is correct in format but bank is unknown', () => {
        expect(() => {
          getDetailsFromCCI('99919313660082002414');
        }).toThrowError();
      });
    });

    describe('BCP', () => {
      it('should return bank account details for account type Ahorro currency PEN', () => {
        const cci = '00219313660082002414';

        const accountDetails = getDetailsFromCCI('00219313660082002414');

        expect(accountDetails).toStrictEqual({
          bank: 'BCP',
          accountNumber: '19336600820024',
          cci,
          type: 'Ahorro',
          currency: 'PEN',
        });
      });

      it('should return bank account details for account type Corriente currency PEN', () => {
        const cci = '00219300660082002144';

        const accountDetails = getDetailsFromCCI(cci);

        expect(accountDetails).toStrictEqual({
          bank: 'BCP',
          accountNumber: '1936600820021',
          cci,
          type: 'Corriente',
          currency: 'PEN',
        });
      });

      it('should return bank account details for account type Ahorro currency USD', () => {
        const cci = '00219313660082012414';

        const accountDetails = getDetailsFromCCI(cci);

        expect(accountDetails).toStrictEqual({
          bank: 'BCP',
          accountNumber: '19336600820124',
          cci,
          type: 'Ahorro',
          currency: 'USD',
        });
      });

      it('should return bank account details for account type Corriente currency USD', () => {
        const cci = '00219300660082012144';

        const accountDetails = getDetailsFromCCI(cci);

        expect(accountDetails).toStrictEqual({
          bank: 'BCP',
          accountNumber: '1936600820121',
          cci,
          type: 'Corriente',
          currency: 'USD',
        });
      });
    });

    describe('BBVA', () => {
      it('should return bank account details', () => {
        const cci = '01135600020019445039';

        const accountDetails = getDetailsFromCCI(cci);

        expect(accountDetails).toStrictEqual({
          bank: 'BBVA',
          accountNumber: '001103560200194450',
          cci,
        });
      });
    });

    describe('INTERBANK', () => {
      it('should return bank account details', () => {
        const cci = '00392401319240299683';

        const accountDetails = getDetailsFromCCI(cci);

        expect(accountDetails).toStrictEqual({
          bank: 'INTERBANK',
          accountNumber: '9243192402996',
          cci,
        });
      });
    });

    describe('SCOTIABANK', () => {
      it('should return bank account details', () => {
        const cci = '00928021280006298996';

        const accountDetails = getDetailsFromCCI(cci);

        expect(accountDetails).toStrictEqual({
          bank: 'SCOTIABANK',
          accountNumber: '2800062989',
          cci,
        });
      });
    });

    describe('BANBIF', () => {
      it('should return bank account details', () => {
        const cci = '03810110700064503226';

        const accountDetails = getDetailsFromCCI(cci);

        expect(accountDetails).toStrictEqual({
          bank: 'BANBIF',
          accountNumber: '007000645032',
          cci,
        });
      });
    });

    describe('MI BANCO', () => {
      it('should return bank account details', () => {
        const cci = '04947900601503257899';

        const accountDetails = getDetailsFromCCI(cci);

        expect(accountDetails).toStrictEqual({
          bank: 'MI BANCO',
          accountNumber: '6015032578',
          cci,
        });
      });
    });

    describe('BANCO DE LA NACION', () => {
      it('should return bank account details', () => {
        const cci = '01800000400588058608';

        const accountDetails = getDetailsFromCCI(cci);

        expect(accountDetails).toStrictEqual({
          bank: 'BANCO DE LA NACION',
          accountNumber: '04005880586',
          cci,
        });
      });
    });
  });
});