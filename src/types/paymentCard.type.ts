export type TypeTokenPayment = {
  details: {
    card: {
      brand: string;
      expMonth: number;
      expYear: number;
      last4: number;
    };
    method: string;
    billing: {
      postalCode: number;
    };
  };
  status: string;
  token: string;
  cardholderName: string;
};
