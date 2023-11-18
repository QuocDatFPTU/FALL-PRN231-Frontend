import React, { Fragment, useState, FC } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/24/outline';
// import DatePicker from "react-datepicker";
import ClearDataButton from 'components/HeroSearchForm/ClearDataButton';
import moment from 'moment';

interface DateRange {
  startDate: moment.Moment | string | Date | null;
  endDate: moment.Moment | string | Date | null;
}
export interface StayDatesRangeInputProps {
  className?: string;
  defaultValue: DateRange;
}

const StayDatesRangeInputV1: FC<StayDatesRangeInputProps> = ({
  className = 'flex-1',
  defaultValue
}) => {
  const [startDate, setStartDate] = useState<moment.Moment | string | Date | null>(
    moment(Date.now()).format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState<moment.Moment | string | Date | null>(
    moment(Date.now() + 4).format('YYYY-MM-DD')
  );
  //

  const onChangeDate = (
    dates: [moment.Moment | string | Date | null, moment.Moment | string | Date | null]
  ) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  React.useEffect(() => {
    if (defaultValue) {
      setStartDate(defaultValue?.startDate);
      setEndDate(defaultValue?.endDate);
    }
  }, [defaultValue]);

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {startDate?.toString() || 'Add dates'}
            {endDate ? ' - ' + endDate.toString() : ''}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {'Check in - Check out'}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none ${
              open ? 'shadow-lg' : ''
            }`}>
            {renderInput()}
            {startDate && open && <ClearDataButton onClick={() => onChangeDate([null, null])} />}
          </Popover.Button>
        </>
      )}
    </Popover>
  );
};

export default StayDatesRangeInputV1;
