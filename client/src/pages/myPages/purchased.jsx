import { Helmet } from 'react-helmet-async';

import { PurshasedView } from 'src/sections/purshased/view';

// ----------------------------------------------------------------------

export default function PurchasedPage() {
  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>

      <PurshasedView />
    </>
  );
}
