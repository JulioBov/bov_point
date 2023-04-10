import Redis from 'ioredis';
import enviroments from '../enviroments';

class Cache {
  private redis: Redis;
  constructor() {
    this.redis = new Redis({ host: enviroments.HOST_REDIS, port: Number(enviroments.PORT) });
  }

  async getValue(key: string): Promise<any> {
    const resp = await this.redis.get(key);
    return resp ? JSON.parse(resp) : false;
  }

  async setValue(key: string, value: any): Promise<string> {
    return this.redis.set(key, JSON.stringify(value));
  }

  async setExpire(key: string, seconds = 10): Promise<number> {
    return this.redis.expire(key, seconds);
  }

  async delValue(key: string): Promise<number> {
    return this.redis.del(key);
  }
}

export default new Cache();
