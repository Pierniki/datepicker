import React from 'react';
import { useState } from 'react';
import { getDaysInMonthArr } from '../utility';
import ScrollableColumn from './ScrollableColumn';

const today = new Date();

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const years = Array.from(Array(9999).keys());

const DatePicker: React.FC = () => {
  const [currentDayIdx, setCurrentDayIdx] = useState<number>(
    today.getUTCDate() - 1
  );
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(
    today.getUTCMonth()
  );
  const [currentYearIdx, setCurrentYearIdx] = useState<number>(
    today.getUTCFullYear()
  );

  console.log(currentDayIdx + 1, currentMonthIdx + 1, currentYearIdx);

  return (
    <div className="scroll_container">
      <ScrollableColumn
        className="days_column"
        currentValueIdx={currentDayIdx}
        setCurrentValueIdx={setCurrentDayIdx}
        valuesArray={getDaysInMonthArr(currentMonthIdx, currentYearIdx)}
      />
      <ScrollableColumn
        className="months_column"
        currentValueIdx={currentMonthIdx}
        setCurrentValueIdx={setCurrentMonthIdx}
        valuesArray={months}
      />
      <ScrollableColumn
        className="years_column"
        currentValueIdx={currentYearIdx}
        setCurrentValueIdx={setCurrentYearIdx}
        valuesArray={years}
      />
    </div>
  );
};

export default DatePicker;
