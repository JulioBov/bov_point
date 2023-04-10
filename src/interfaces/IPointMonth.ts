import IPointDay from './IPointDay';

// O valor absoluto é o valor real, sem aplicação de filtro
// O valor relativo, é o valor relativo a query que está sendo executada na ação
interface IPointMonth {
  month: number;
  hours_worked_month_ralative: string;
  hours_worked_month_absolute?: string;
  points: IPointDay[];
}

export default IPointMonth;
