import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Purchased',
    path: '/purchased',
    icon: icon('ic_blog')
  },
  {
    title: 'Purchased-Order',
    path: '/purchasedOrder',
    icon: icon('ic_blog')
  },
  {
    title: 'Sales',
    path: '/sales',
    icon: icon('ic_blog')
  },
  {
    title: 'Sales-order',
    path: '/salesOrder',
    icon: icon('ic_blog')
  },
];

export default navConfig;
