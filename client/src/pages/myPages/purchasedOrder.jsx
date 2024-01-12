import { Helmet } from 'react-helmet-async';

import { PurchaseOrderView } from 'src/sections/purchase_order/view';

// ----------------------------------------------------------------------

export default function PurchaseOrder() {
  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>

    <PurchaseOrderView/>
    </>
  );
}
