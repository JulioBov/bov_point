import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import db from '../database/db';
import IPoint from '../interfaces/IPoint';
import IPointDay from '../interfaces/IPointDay';
import IPointMonth from '../interfaces/IPointMonth';
import IPointYear from '../interfaces/IPointYears';
import IRequestQueryListPoints from '../interfaces/IRequestQueryListPoints';
import { findCategories } from '../repositories/categories.repository';
import { findSubCategories } from '../repositories/sub_categories.repository';
import { calculateWorkedHours } from '../utils/calculates';
import { listPoints, registerPoint, sumHoursMonth, sumHoursYears } from './../repositories/point.repository';
import IPointService from './Iservices/IPointService';
import { validateCreatePoint } from './businessRules/point.rules';

class PointService implements IPointService {
  async listPoints(query: IRequestQueryListPoints, userId: string) {
    const result = await listPoints(query, userId);
    const resultSumHoursYear = await sumHoursYears(userId);

    const arrayCategories: string[] = [];
    const arraySubCategories: string[] = [];
    result.forEach((r) => {
      if (r.category_id) arrayCategories.push(r.category_id);
      if (r.sub_category_id) arraySubCategories.push(r.sub_category_id);
    });

    const categories = await findCategories(_.uniq(arrayCategories));
    const subCategories = await findSubCategories(_.uniq(arraySubCategories));

    const groupYear = _.chain(result)
      .groupBy('year')
      .map((value, key) => ({ year: key, points: value }))
      .value();

    const resultList: IPointYear[] = [];
    const resultListPointsMonths: IPointMonth[] = [];
    const resultListPointsDay: IPointDay[] = [];

    await Promise.all(
      groupYear.map(async (y) => {
        const hoursWorkedYear = calculateWorkedHours(y.points);
        const groupMonth = _.chain(y.points)
          .groupBy('month')
          .map((value, key) => ({ month: key, points: value }))
          .value();

        await Promise.all(
          groupMonth.map(async (m) => {
            const resultSumHoursMonth = await sumHoursMonth(userId, Number(y.year), Number(m.month));
            const hoursWorkedMonth = calculateWorkedHours(m.points);

            const groupDay = _.chain(m.points)
              .groupBy('day')
              .map((value, key) => ({ day: key, points: value }))
              .value();

            groupDay.map(async (d) => {
              const hoursWorkedDay = calculateWorkedHours(d.points);
              resultListPointsDay.push({
                day: Number(d.day),
                hours_worked_day: hoursWorkedDay,
                points: d.points,
              });
            });

            resultListPointsMonths.push({
              month: Number(m.month),
              hours_worked_month_ralative: hoursWorkedMonth,
              hours_worked_month_absolute: resultSumHoursMonth.find((mm) => mm.month === Number(m.month))?.time,
              points: resultListPointsDay,
            });
          })
        );

        resultList.push({
          year: Number(y.year),
          hours_worked_year_relative: hoursWorkedYear,
          hours_worked_year_absolute: resultSumHoursYear.find((h) => h.year === Number(y.year))?.time!,
          points_month: resultListPointsMonths,
        });
      })
    );

    resultList.forEach((a) => {
      a.points_month.forEach((b) => {
        b.points.forEach((c) => {
          c.points.forEach((d) => {
            if (d.category_id) d.category = categories.find((x) => x.category_id === d.category_id);
            if (d.sub_category_id) d.category = subCategories.find((x) => x.sub_category_id === d.sub_category_id);
          });
        });
      });
    });

    return resultList;
  }

  async createPoint(points: IPoint[], userId: string) {
    await validateCreatePoint(points, userId);

    const pointsForSave: IPoint[] = [];
    points.forEach((point: IPoint) => {
      const x: IPoint = {
        point_id: uuidv4(),
        user_id: userId,
        time: point.time,
        date: point.date,
        day: Number(point.date.toString().substring(8, 10)),
        month: Number(point.date.toString().substring(5, 7)),
        year: Number(point.date.toString().substring(0, 4)),
        category_id: point.category_id ?? null,
        sub_category_id: point.sub_category_id ?? null,
        status: 'active',
      };
      pointsForSave.push(x);
    });

    await db.transaction(async (trx) => {
      await Promise.all(
        pointsForSave.map(async (point: IPoint) => {
          await registerPoint(point, trx);
        })
      );
    });
    return true;
  }
}

export default PointService;
