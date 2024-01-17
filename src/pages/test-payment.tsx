/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import BasicButton from '@/components/common/BasicButton';

import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import useScript from '@/hooks/useScript';

function TestPayment() {
  // const scriptLoadStatus = useScript('https://sandbox.web.squarecdn.com/v1/square.js', {
  //   removeOnUnmount: true,
  // });
  // const [cardPayment, SetCardPayent] = useState<any>();
  // const loadCardPayment = useCallback(async () => {
  //   try {
  //     const { Square } = (await window) as any;
  //     const payments = await Square.payments('sandbox-sq0idb-D2CWOkfcHp9iSL7UhMaahQ', 'LRSZSN4ANT6M8');
  //     const card = await payments.card({
  //       postalCode: '12345',
  //     });
  //     await card.attach('#card-container');
  //     const form = document.getElementsByClassName('sq-card-component')[0];
  //     form.setAttribute('id', 'ifameCardPayment');
  //     form.setAttribute('credentialless', 'true');
  //     SetCardPayent(card);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [cardPayment]);

  // useEffect(() => {
  //   if (scriptLoadStatus === 'ready') {
  //     loadCardPayment();
  //   }
  // }, [scriptLoadStatus]);
  // const inputCardNumber = document.getElementById('card-number-wrapper');
  // useEffect(() => {
  //   if (cardPayment) {
  //   }
  // }, [cardPayment]);
  // console.log(inputCardNumber);

  return (
    <div className="pt-[20px]">
      <PaymentForm
        applicationId="sandbox-sq0idb-D2CWOkfcHp9iSL7UhMaahQ"
        cardTokenizeResponseReceived={async (token, buyer) => {
          console.info({ token, buyer });
          // try{
          //   const response =

          // }
        }}
        formProps={{
          className: 'aloo2',
        }}
        locationId="LRSZSN4ANT6M8"
      >
        <CreditCard
          buttonProps={{
            // isLoading: true,
            onClick: (e) => console.log(e),
          }}
        />
      </PaymentForm>

      {/* <div id="payment-form">
        <div id="payment-status-container" />
        <div id="card-container" />
        <button
          className="bg-slate-900 w-12 text-white"
          id="card-button"
          onClick={async () => {
            const ifameCardPayment = document.getElementById('ifameCardPayment');
            console.log(ifameCardPayment);
            console.log(ifameCardPayment?.getElementsByClassName('sq-error'));
            try {
              const result = await cardPayment.tokenize();
              console.log(result);
            } catch (err) {
              console.log(err);
            }
          }}
          type="button"
        >
          Pay
        </button>
      </div> */}
    </div>
  );
}

export default TestPayment;
