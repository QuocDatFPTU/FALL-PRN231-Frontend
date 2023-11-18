import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { PathName } from 'routers/types';
import { DateRage, LocationType } from './StaySearchForm';
import moment from 'moment';
import { DataReserveType } from 'components/SectionHeroArchivePage/SectionHeroArchivePage';
import Button from 'shared/Button/Button';

type Props = {
  href: string;
  checkoutData?: DataReserveType;
};

const ButtonSubmitCheckout = (props: Props) => {
  return (
    <>
      <Link
        to={props.href ?? '/listing-tour'}
        type="button"
        className="flex items-center justify-center text-neutral-50 focus:outline-none"
        // className="h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
        state={{
          totalPrice: props.checkoutData?.totalPrice,
          roomTypeId: props.checkoutData?.roomTypeRequests[0].roomTypeId,
          quantity: props.checkoutData?.roomTypeRequests[0].quantity,
          checkInDate: props.checkoutData?.roomTypeRequests[0].checkInDate,
          checkOutDate: props.checkoutData?.roomTypeRequests[0].checkOutDate,
          customerLName: props.checkoutData?.customer.lastName,
          customerFName: props.checkoutData?.customer.firstName,
          customerEmail: props.checkoutData?.customer.email,
          customerPhone: props.checkoutData?.customer.phoneNumber,
        }}>
        <Button
          className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 `}>
          Reserve
        </Button>
      </Link>
    </>
  );
};

export default ButtonSubmitCheckout;
