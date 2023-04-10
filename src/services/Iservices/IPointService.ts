import IPoint from '../../interfaces/IPoint';
import IPointYear from '../../interfaces/IPointYears';
import IRequestQueryListPoints from '../../interfaces/IRequestQueryListPoints';

interface IPointService {
  createPoint: (points: IPoint[], userId: string) => Promise<boolean>;
  listPoints: (query: IRequestQueryListPoints, userId: string) => Promise<IPointYear[]>;
}

export default IPointService;
