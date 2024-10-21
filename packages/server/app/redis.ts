// Imports:
import Redis from 'ioredis';
import { globalConfig } from './config';

const redis = new Redis({
  host: globalConfig.REDIS_HOST,
  port: Number(globalConfig.REDIS_PORT),
  password: globalConfig.REDIS_PASSWORD,
});

redis.on('connect', () => {
  console.log('Connected to redis 🚀');
});

export default redis;
