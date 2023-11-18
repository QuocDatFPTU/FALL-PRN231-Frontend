import bookingApi from 'api/bookingApi';
import StartRating from 'components/StartRating/StartRating';
import React, { FC, useState } from 'react';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import NcImage from 'shared/NcImage/NcImage';

export interface PayPageProps {
  className?: string;
}
interface Payment {
  status: string
}
const PayPage: FC<PayPageProps> = ({ className = '' }) => {
  const [payment, setPayment] = useState<Payment>();
  React.useEffect(() => {
    async function handleCheckPayment() {
      const searchParams = new URLSearchParams(window.location.search);
      const response = await bookingApi.getConfirm(searchParams);
      console.log('status', response);
      setPayment(response.data);
    }
    handleCheckPayment();
  }, []);

  const renderContent = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">Congratulation 🎉</h2>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Your booking</h3>
          <div className="flex flex-col sm:flex-row sm:items-center"></div>
        </div>

        {/* ------------------------ */}
        {payment?.status === 'Confirmed' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-5">Booking status</h3>
            <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100 ">
              Payment SuccessFully!
            </span>
          </div>
        )}

        <div>
          <ButtonPrimary href="/">Explore more stays</ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default PayPage;
