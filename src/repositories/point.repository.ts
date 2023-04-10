import { Knex } from 'knex';
import db from '../database/db';
import InternalServerError from '../errors/InternalServerError';
import IPoint from '../interfaces/IPoint';
import IRequestQueryListPoints from '../interfaces/IRequestQueryListPoints';
import ISumHoursMonth from './interfaces/ISumHoursMonth';
import ISumHoursYear from './interfaces/ISumHoursYear';

const TABLE = 'points';

export const listPoints = async (query: IRequestQueryListPoints, userId: string): Promise<IPoint[]> => {
  try {
    let sql = `${TABLE} as p where p.user_id = '${userId}'`;
    sql = query.day ? `${sql} and p.day = ${query.day}` : sql;
    sql = query.month ? `${sql} and p.month = ${query.month}` : sql;
    sql = query.year ? `${sql} and p.year = ${query.year}` : sql;
    sql = query.createdAfter ? `${sql} and p.date > '${query.createdAfter}'` : sql;
    sql = query.createdBefore ? `${sql} and p.date < '${query.createdBefore}'` : sql;
    sql = query.category_id ? `${sql} and p.category_id = '${query.category_id}'` : sql;
    sql = query.sub_category_id ? `${sql} and p.sub_category_id = '${query.sub_category_id}'` : sql;

    return await db(TABLE).fromRaw(sql);
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export const sumHoursYears = async (userId: string): Promise<ISumHoursYear[]> => {
  try {
    const results: ISumHoursYear[] = [];
    const result = await db(TABLE).sum('time').select('year').where('user_id', userId).groupBy('year');

    result.forEach((x: any) => {
      results.push({
        year: x.year,
        time: `${x.sum.hours ?? '00'}:${x.sum.minutes ?? '00'}:${x.sum.seconds ?? '00'}`,
      });
    });

    return results;
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export const sumHoursMonth = async (userId: string, year: number, month: number): Promise<ISumHoursMonth[]> => {
  try {
    const results: ISumHoursMonth[] = [];
    const result = await db(TABLE)
      .sum('time')
      .select('month')
      .where('user_id', userId)
      .andWhere('year', year)
      .andWhere('month', month)
      .groupBy('month');

    result.forEach((x: any) => {
      results.push({
        month: x.month,
        time: `${x.sum.hours ?? '00'}:${x.sum.minutes ?? '00'}:${x.sum.seconds ?? '00'}`,
      });
    });

    return results;
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export const findPointUserDay = async (userId: string, date: Date): Promise<IPoint[]> => {
  try {
    return await db(TABLE).where('user_id', userId).andWhere('date', date);
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export const registerPoint = async (point: IPoint, trx: Knex.Transaction): Promise<boolean> => {
  try {
    await db(TABLE).insert(point).transacting(trx);
    return true;
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export default { findPointUserDay, registerPoint, listPoints };
