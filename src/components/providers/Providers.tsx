'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SessionProvider } from 'next-auth/react';


interface Props {
  children: React.ReactNode;
}


export const Providers = ({ children }: Props) => {

  // console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '')

  return (
// esto lo debo eliminar cuando ya no use el provider de paypal
    <PayPalScriptProvider options={{ 
      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '', 
      intent: 'CAPTURE',
      // intent: 'capture',
      currency: 'USD',
      //Cambiarlo a CLP si ya dejo de usar Paypal
      // currency: 'USD',

      }}>

      <SessionProvider>
        {children}
      </SessionProvider>

    </PayPalScriptProvider>
  )
}