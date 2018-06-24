const CATEGORY_API_PROD  = 'https://api.alt.ausgrads.academy/category';
const PRODUCT_API_PROD   = 'https://api.alt.ausgrads.academy/product';
const USER_API_PROD      = 'https://api.alt.ausgrads.academy/user';
const VENDOR_API_PROD    = 'https://api.alt.ausgrads.academy/vendor';

const CATEGORY_API_DEV  = 'http://localhost:10001';
const PRODUCT_API_DEV   = 'http://localhost:10005';
const USER_API_DEV      = 'http://localhost:10002';
const VENDOR_API_DEV    = 'http://localhost:10000';

// prod = true, test = true, dev = false
let PRODUCTION = false;
if (process.env.REACT_APP_ENV !== "development")
  PRODUCTION = true;

export const CATEGORY_API_GATEWAY = PRODUCTION ? CATEGORY_API_PROD  : CATEGORY_API_DEV;
export const PRODUCT_API_GATEWAY  = PRODUCTION ? PRODUCT_API_PROD   : PRODUCT_API_DEV;
export const USER_API_GATEWAY     = PRODUCTION ? USER_API_PROD      : USER_API_DEV;
export const VENDOR_API_GATEWAY   = PRODUCTION ? VENDOR_API_PROD    : VENDOR_API_DEV;