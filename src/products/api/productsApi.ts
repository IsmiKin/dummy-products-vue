import axios from 'axios';

import { APP_CONFIG_SETTINGS } from '@/shared/constants/appConfigSettings';

const productsApi = axios.create({
  baseURL: `https://${APP_CONFIG_SETTINGS.PRODUCTS_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default productsApi;
