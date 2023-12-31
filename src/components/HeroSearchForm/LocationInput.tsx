import React, { useState } from 'react';
import { FC } from 'react';
import { useEffect } from 'react';
import ClearDataButton from './ClearDataButton';
import { useRef } from 'react';
import RecentSearchList from 'components/RecentSearchList/RecentSearchList';
import { useDebounce } from 'react-use';
import destinationApi from 'api/destinationApi';
import { LocationType } from './StaySearchForm';

export interface LocationInputProps {
  defaultValue: LocationType;
  onChange?: (value: LocationType) => void;
  onInputDone?: (value: LocationType) => void;
  placeHolder?: string;
  desc?: string;
  className?: string;
  autoFocus?: boolean;
  locationRef: React.RefObject<HTMLSelectElement>,
}

type DestinationResponse = {
  id: number;
  imageUrl: string;
  latitude: number;
  longitude: number;
  name: string;
  noOfHotels: number;
};

const LocationInput: FC<LocationInputProps> = ({
  defaultValue,
  autoFocus = false,
  onChange,
  onInputDone,
  placeHolder = 'Location',
  desc = 'Where are you going?',
  className = 'nc-flex-1.5',
  locationRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>(defaultValue.name);
  const [id, setId] = useState<number>(0);
  const [showPopover, setShowPopover] = useState(autoFocus);
  const [destinationList, setDestinationList] = useState<DestinationResponse[]>([]);
  const [, cancel] = useDebounce(
    async () => {
      setValue(value);
      if (value.length !== 0) {
        const data = await destinationApi.getAll({ searchText: value, limit: 10 });
        setDestinationList(data.data);
      }
    },
    1000,
    [value]
  );
  // useEffect(() => {
  //   setValue(defaultValue);
  // }, [defaultValue]);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener('click', eventClickOutsideDiv);
    }
    showPopover && document.addEventListener('click', eventClickOutsideDiv);
    return () => {
      document.removeEventListener('click', eventClickOutsideDiv);
    };
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  const handleSelectLocation = (item: LocationType) => {    
    setValue(item.name);
    setId(item.id);
    onInputDone && onInputDone(item);
    onChange && onChange(item);
    setShowPopover(false);
  };

  const renderRecentSearches = () => {
    return (
      <>
        <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
          Recent searches
        </h3>
        <RecentSearchList />
        <div className="mt-2">
          {[
            { name: 'Hamptons, Suffolk County, NY', id: -4 },
            { name: 'Las Vegas, NV, United States', id: -3 },
            { name: 'Ueno, Taito, Tokyo', id: -2 },
            { name: 'Ikebukuro, Toshima, Tokyo', id: -1 }
          ].map((item: LocationType) => (
            <span
              onClick={() => handleSelectLocation(item)}
              key={item.id}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
              <span className="block text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 sm:h-6 w-4 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span className=" block font-medium text-neutral-700 dark:text-neutral-200">
                {item.name}
              </span>
            </span>
          ))}
        </div>
      </>
    );
  };

  const renderSearchValue = () => {
    return (
      <>
        {destinationList.map((item) => (
          <span
            onClick={() => handleSelectLocation(item)}
            key={item.id}
            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
            <span className="block text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <span className="block font-medium text-neutral-700 dark:text-neutral-200">
              {item.name}
            </span>
          </span>
        ))}
      </>
    );
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
          showPopover ? 'nc-hero-field-focused' : ''
        }`}>
        <div className="text-neutral-300 dark:text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nc-icon-field"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
            placeholder={placeHolder}
            value={value}
            autoFocus={showPopover}
            onChange={(e) => {
              setValue(e.currentTarget.value);
              
              // onChange && onChange({ name: e.currentTarget.value, id: id });
            }}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
          {value && showPopover && (
            <ClearDataButton
              onClick={() => {
                setValue('');
                setId(0);
                onChange && onChange({ name: '', id: 0 });
              }}
            />
          )}
        </div>
      </div>
      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] lg:min-w-[992px] 2xl:min-w-[1152px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto scrollbar-none min-h-[304px]">
          {value ? renderSearchValue() : renderRecentSearches()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
