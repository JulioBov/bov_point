import IPointMonth from './IPointMonth';

// O valor absoluto é o valor real, sem aplicação de filtro
// O valor relativo, é o valor relativo a query que está sendo executada na ação
interface IPointYears {
  year: number;
  hours_worked_year_relative: string;
  hours_worked_year_absolute: string;
  points_month: IPointMonth[];
}

export default IPointYears;
