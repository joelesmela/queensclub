import React, { useEffect } from 'react';
import { useMercadopago } from 'react-sdk-mercadopago';

export default function Checkout({
  galleryName, queen, price, id,
}) {
  // const mercadopago = useMercadopago.v2(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
  //     locale: "en-AR",
  //   });
  const mercadopago = useMercadopago.v2('APP_USR-e465f4f3-1c07-4195-87b8-9ac838e46228', {
    locale: 'es-AR',
  });

  useEffect(() => {
    if (mercadopago) {
      const preference = {
        payer_email: 'asdsa@asd.com',
        items: [
          {
            title: galleryName,
            description: `galeria de ${queen}`,
            category_id: 'category123',
            quantity: 1,
            unit_price: Number(price),
          },
        ],
        back_urls: {
          failure: 'http://localhost:3000/',
          pending: 'http://localhost:3000/',
          success: `http://localhost:3000/gallery/${id}`,
        },
        auto_return: 'approved',
      };
      mercadopago.checkout({
        preference,
        render: {
          container: '.cho-container',
          label: 'Mercado Pago',
        },
      });
    }
  }, [id]);

  return (
    <div>
      <div className="cho-container" />
    </div>
  );
}
