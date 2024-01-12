import { Helmet } from 'react-helmet-async';

import { SalesOrder } from 'src/sections/sales_order/view';

// ----------------------------------------------------------------------

export default function PurchaseOrder() {
  return (
    <>
      <Helmet>
        <title> Sales | Orders </title>
      </Helmet>

    <SalesOrder/>
    </>
  );
}
