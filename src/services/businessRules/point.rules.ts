import { add } from 'date-fns';
import _ from 'lodash';
import UnprocessableEntity from '../../errors/UnprocessableEntity';
import IPoint from '../../interfaces/IPoint';
import { findCategories } from '../../repositories/categories.repository';
import { findPointUserDay } from '../../repositories/point.repository';
import { findSubCategories } from '../../repositories/sub_categories.repository';
import findTranslation from '../../translations/translation';
import { sumHours } from '../../utils/calculates';

export const validateCreatePoint = async (points: IPoint[], userId: string): Promise<boolean> => {
  const arrayCategories: string[] = [];
  const arraySubCategories: string[] = [];
  const arrayHours: string[] = [];
  const arrayDates: Date[] = [];

  points.forEach((point) => {
    arrayHours.push(point.time);
    arrayDates.push(point.date);
    if (point.category_id) arrayCategories.push(point.category_id);
    if (point.sub_category_id) arraySubCategories.push(point.sub_category_id);
  });

  if (_.uniq(arrayDates).length > 1) {
    throw new UnprocessableEntity(await findTranslation(userId, '16'));
  }

  // Data do Aniversio do Jhonatan, usada como base
  let z = new Date(`1991-03-25T00:00:00Z`);
  z = sumHours(arrayHours);

  const a = Number(z.toISOString().substring(0, 4));
  const b = Number(z.toISOString().substring(5, 7));
  const c = Number(z.toISOString().substring(8, 10));

  if (!((a === 1991 && b === 3 && c === 26 && z.toISOString().substring(11, 19) === '00:00:00') || (a === 1991 && b === 3 && c === 25))) {
    throw new UnprocessableEntity(await findTranslation(userId, '17'));
  }

  const pointsUserDay = await findPointUserDay(userId, arrayDates[0]);
  if (pointsUserDay.length !== 0) {
    let k = new Date(`1991-03-25T00:00:00Z`);
    k = sumHours(arrayHours);

    k = add(k, {
      hours: z.getUTCHours(),
      minutes: z.getUTCMinutes(),
      seconds: z.getUTCSeconds(),
    });

    const a = Number(k.toISOString().substring(0, 4));
    const b = Number(k.toISOString().substring(5, 7));
    const c = Number(k.toISOString().substring(8, 10));

    if (!((a === 1991 && b === 3 && c === 26 && k.toISOString().substring(11, 19) === '00:00:00') || (a === 1991 && b === 3 && c === 25))) {
      throw new UnprocessableEntity(await findTranslation(userId, '17'));
    }
  }

  const restul = await findCategories(_.uniq(arrayCategories));

  if ((await findCategories(_.uniq(arrayCategories))).length !== _.uniq(arrayCategories).length) {
    throw new UnprocessableEntity(await findTranslation(userId, '14'));
  }

  if ((await findSubCategories(_.uniq(arraySubCategories))).length !== _.uniq(arraySubCategories).length) {
    throw new UnprocessableEntity(await findTranslation(userId, '15'));
  }

  return true;
};

export default {
  validateCreatePoint,
};
