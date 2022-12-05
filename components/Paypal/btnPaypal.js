import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import clientAxios from '../../config/clientAxios';

const BtnPaypal = ({ price, queen, galleryName }) => {
  const router = useRouter();
  return (
        <div>

            <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_KEY }}>

                <PayPalButtons

                    createOrder={async () => {
                      try {
                        const res = await clientAxios.post('purchase/paypal', {
                          amounts: price,
                        });
                        return res.data.id;
                      } catch (err) {
                        console.log(err);
                        alert('OCURRIO UN ERROR INTENTELO NUEVAMENTE EN UNOS INSTANTES');
                      }
                    }}

                    onCancel={data => console.log('compra cancelada')}

                    onApprove={async (data, actions) => {
                      try {
                        const res = await clientAxios.post('purchase/paypalIpn', {
                          galleryName,
                          queen,
                          price_USD: price,
                        });
                        if (res.status === 201) {
                          router.push(`/gallery/${galleryName}`);
                        }
                      } catch (error) {
                        alert('OCURRIO UN ERROR INTENTELO NUEVAMENTE EN UNOS INSTANTES');
                        router.push(`/gallery/${galleryName}`);
                      }
                    }}
                    onError={err => console.log('error al realizar la transaccion')}
                    style={{
                      layout: 'horizontal', color: 'silver', height: 45, tagline: false,
                    }} />
            </PayPalScriptProvider>

        </div>
  );
};

export default BtnPaypal;
