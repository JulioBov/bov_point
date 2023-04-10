import dotenv from 'dotenv';

dotenv.config({});

interface Env {
  PORT?: string;
  CONNECTION_PG?: string;
  KEY_TOKEN?: string;
  PRODUCT_ID?: string;
  PORT_REDIS?: string;
  HOST_REDIS?: string;
}

const env: Env = {
  PORT: process.env.PORT,
  CONNECTION_PG: process.env.CONNECTION_PG,
  KEY_TOKEN: process.env.KEY_TOKEN,
  PRODUCT_ID: process.env.PRODUCT_ID,
  HOST_REDIS: process.env.HOST_REDIS,
  PORT_REDIS: process.env.PORT_REDIS,
};

export default env;
