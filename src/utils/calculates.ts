import { add, differenceInMilliseconds } from 'date-fns';
import IPoint from '../interfaces/IPoint';

export const calculateWorkedHours = (points: IPoint[]) => {
  let a = new Date(`1991-03-25T00:00:00Z`);
  let z = sumHours(points.map((x) => x.time));

  const k = differenceInMilliseconds(z, a);
  const hours = Number(Math.floor(k / 3600000));
  const minutes = Number(Math.floor((k % 3600000) / 60000));
  const seconds = Number(Math.floor((k % 60000) / 1000));
  const hoursFormat = hours < 10 ? `0${hours}` : hours;
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const secondsFormat = seconds < 10 ? `0${seconds}` : seconds;
  return `${hoursFormat}:${minutesFormat}:${secondsFormat}`;
};

export const sumHours = (hours: string[]) => {
  let z = new Date(`1991-03-25T00:00:00Z`);
  for (let index = 0; index < hours.length; index++) {
    const x = new Date(`1991-03-25T${hours[index]}Z`);
    z = add(z, {
      hours: x.getUTCHours(),
      minutes: x.getUTCMinutes(),
      seconds: x.getUTCSeconds(),
    });
  }
  return z;
};

export default { calculateWorkedHours, sumHours };
