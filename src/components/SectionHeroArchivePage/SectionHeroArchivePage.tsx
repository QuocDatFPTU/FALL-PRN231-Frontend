import React, { FC, ReactNode } from 'react';
// import imagePng from 'images/hero-right2.png';
import HeroSearchForm, { SearchTab } from 'components/HeroSearchForm/HeroSearchForm';
import { destinationsType } from 'api/destinationApi';
import { HotelDetailypeNew, MasterRooms } from 'api/hotelApi';
import DetailPagetLayout from 'containers/Layout';

import StartRating from 'components/StartRating/StartRating';
import Avatar from 'shared/Avatar/Avatar';
// import ButtonPrimary from 'shared/ButtonButtonPrimary';
import StayDatesRangeInput from 'components/HeroSearchForm/StayDatesRangeInput';
import GuestsInput from 'components/HeroSearchForm/GuestsInput';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import StayDatesRangeInputV1 from './StayDatesRangeInputV1';
import GuestsInputV1 from './GuestsInputV1';
import { Amenities_demos } from 'contains/cons';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import moment from 'moment';
import ButtonSubmitCheckout from 'components/HeroSearchForm/ButtonSubmitCheckout';

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  currentPage: 'Rooms' | 'Experiences' | 'Cars' | 'Flights';
  currentTab: SearchTab;
  rightImage?: string;
  data: HotelDetailypeNew;
}

export interface DataReserveType {
  totalPrice: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: 'string';
  };
  roomTypeRequests: [
    {
      roomTypeId: number;
      quantity: number;
      checkInDate: string;
      checkOutDate: string;
    }
  ];
}
const HeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = '',
  data,
  listingType,
  currentPage,
  currentTab
  // rightImage = imagePng
}) => {
  const [dataReserve, setDataReserve] = React.useState<DataReserveType>();
  console.log('data hotels detail', data);
  console.log('dataReserve', dataReserve);
  const masterRooms = data?.masterRooms.map((e: MasterRooms) => {
    return {
      availability: e.availability,
      name: e.name,
      price: e.price,
      reviewCount: e.reviewCount,
      reviewRatting: e.reviewRatting,
      createdBy: e.createdBy,
      createdAt: e.createdAt,
      modifiedBy: e.modifiedBy,
      modifiedAt: e.modifiedAt,
      id: e.id,
      roomTypeGroups: e.roomTypeGroups.map((e) => ({
        name: e.name,
        groupId: e.groupId
      })),
      roomTypeImages: e.roomTypeImages,
      quantity: data.quantity,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate
    };
  });
  console.log('master room data', masterRooms);
  const handleRoomTypeReserve = (item: any) => {
    console.log('iten', item);
    // let payload = {
    //   totalPrice: item.totalPrice,
    //   customer: item.customer,
    //   roomTypeRequests: [
    //     {
    //       ...item.roomTypeRequests,
    //       checkInDate: data?.checkInDate,
    //       checkoutDate: data?.checkOutDate
    //     }
    //   ]
    // } as DataReserveType;

    setDataReserve(item);
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          {/* <Badge name="Wooden house" />
          <LikeSaveBtns /> */}
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{data?.name}</h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          <StartRating />
          <span>·</span>
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1"> {data?.address}</span>
          </span>
        </div>

        {/* 4 */}
        <div className="flex items-center">
          <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Hosted by{' '}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              Kevin Francis
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-3 ">
            <i className=" las la-user text-2xl "></i>
            <span className="">
              {data?.quantity} <span className="hidden sm:inline-block">guests</span>
            </span>
          </div>
          {/* <div className="flex items-center space-x-3">
            <i className=" las la-bed text-2xl"></i>
            <span className=" ">
              6 <span className="hidden sm:inline-block">beds</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-bath text-2xl"></i>
            <span className=" ">
              3 <span className="hidden sm:inline-block">baths</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-door-open text-2xl"></i>
            <span className=" ">
              2 <span className="hidden sm:inline-block">bedrooms</span>
            </span>
          </div> */}
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Stay information</h2>

        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>{data?.description}</span>
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>

        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {Amenities_demos.filter((_, i) => i < 12).map((item) => (
            <div key={item.name} className="flex items-center space-x-3">
              <i className={`text-3xl las ${item.icon}`}></i>
              <span className=" ">{item.name}</span>
            </div>
          ))}
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        {/* <div>
          <ButtonSecondary onClick={openModalAmenities}>View more 20 amenities</ButtonSecondary>
        </div>
        {renderMotalAmenities()} */}
      </div>
    );
  };

  const renderSection4 = () => {
    return masterRooms?.map((e, index) => {
      return (
        <div className="listingSection__wrap" key={e.roomTypeGroups[index].groupId}>
          <div>
            <h2 className="text-2xl font-semibold">Choose Room type </h2>
          </div>

          <div className="text-2xl">{e?.name}</div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 text-sm text-neutral-700 dark:text-neutral-300 ">
            <div className="left-box col-span-1 flex flex-col gap-2">
              <span className="pb-2 font-semibold">Room Type</span>
              <div className="masterRoomImage ">
                <div className="featureImage ">
                  <img
                    src={e.roomTypeImages[0].imageUrl}
                    alt=""
                    className="h-16 object-cover w-full cursor-pointer"
                  />
                </div>
              </div>
              <div className="subImage">
                <div className="subImageContainer flex gap-1">
                  <div className="imgSubWrapper flex-1">
                    <img
                      src={e?.roomTypeImages[1].imageUrl}
                      alt=""
                      className="h-12 object-cover w-full cursor-pointer"
                    />
                  </div>
                  <div className="imgSubWrapper flex-1">
                    <img
                      src={e?.roomTypeImages[2].imageUrl}
                      alt=""
                      className="h-12 object-cover w-full cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="masterRoomDetail mt-2">
                <ul className="list-disc">
                  {e.roomTypeGroups.map((data) => {
                    return <li key={data.groupId}>{data.name}</li>;
                  })}
                </ul>
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="right-box flex-2 flex items-center col-span-1 flex-col w-full gap-2">
              <span className="pb-2 font-semibold">Room price</span>
              <div className="price text-red-500 text-3xl font-semibold">
                {`${e.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`} đ
              </div>
              <ButtonPrimary
                className="mt-4 w-5/6"
                onClick={() => {
                  const paydload = {
                    totalPrice: e.price,
                    customer: {
                      firstName: 'Dat',
                      lastName: 'Nguyen',
                      email: 'datquoc3003@gmail.com',
                      phoneNumber: '0338986715'
                    },
                    roomTypeRequests: [
                      {
                        roomTypeId: e.id === null ? 2 : e.id,
                        quantity: e.quantity === null ? 2 : e.quantity,
                        checkInDate: e.checkInDate,
                        checkOutDate: e.checkOutDate
                      }
                    ]
                  };
                  handleRoomTypeReserve(paydload);
                }}>
                Đặt ngay
              </ButtonPrimary>
            </div>
          </div>
        </div>
      );
    });
  };
  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Refund 50% of the booking value when customers cancel the room within 48 hours after
            successful booking and 14 days before the check-in time. <br />
            Then, cancel the room 14 days before the check-in time, get a 50% refund of the total
            amount paid (minus the service fee).
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Check-in time</h4>
          <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
            <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <span>Check-in</span>
              <span>08:00 am - 12:00 am</span>
            </div>
            <div className="flex space-x-10 justify-between p-3">
              <span>Check-out</span>
              <span>02:00 pm - 04:00 pm</span>
            </div>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Special Note</h4>
          <div className="prose sm:prose">
            <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">{data?.notes}</ul>
          </div>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap-new shadow-xl">
        {/* PRICE */}
        {dataReserve !== null ? (
          <>
            <div className="flex justify-between">
              <span className="text-3xl font-semibold">
                đ {dataReserve?.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                {/* <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                  /night
                </span> */}
              </span>
              <StartRating />
            </div>

            {/* FORM */}
            <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
              <StayDatesRangeInputV1
                className="flex-1 z-[11]"
                defaultValue={{ startDate: data.checkInDate, endDate: data.checkOutDate }}
              />
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
              <GuestsInputV1 className="flex-1" defaultValue={data.quantity} />
            </form>

            {/* SUM */}
            <div className="flex flex-col space-y-4">
              {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>$119 x 3 night</span>
                <span>$357</span>
              </div>
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>Service charge</span>
                <span>$0</span>
              </div> */}
              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  đ {dataReserve?.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
              </div>
            </div>

            {/* SUBMIT */}
            <ButtonSubmitCheckout
              href={'/checkout'}
              checkoutData={dataReserve}></ButtonSubmitCheckout>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <span className="text-3xl font-semibold">
                đ{' '}
                <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                  /night
                </span>
              </span>
              <StartRating />
            </div>

            {/* FORM */}
            <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
              <StayDatesRangeInputV1
                className="flex-1 z-[11]"
                defaultValue={{ startDate: moment(Date.now()), endDate: moment(Date.now() + 2) }}
              />
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
              <GuestsInputV1 className="flex-1" />
            </form>

            {/* SUM */}
            <div className="flex flex-col space-y-4">
              {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>$119 x 3 night</span>
                <span>$357</span>
              </div>
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>Service charge</span>
                <span>$0</span>
              </div> */}
              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>đ {}</span>
              </div>
            </div>

            {/* SUBMIT */}
            <ButtonPrimary href={'/checkout'}>Reserve</ButtonPrimary>
          </>
        )}
      </div>
    );
  };

  return (
    <DetailPagetLayout>
      <div
        className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
        data-nc-id="SectionHeroArchivePage"></div>
      <div className="nc-ListingStayDetailPage">
        {/*  HEADER */}
        <header className="rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
            <div className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer ">
              <img
                className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                src={data?.hotelImages[0].imageUrl}
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {data?.hotelImages
              .filter((_, i) => i >= 1 && i < 5)
              .map((item, index) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                    index >= 3 ? 'hidden sm:block' : ''
                  }`}>
                  <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                    <img
                      className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                      src={item.imageUrl || ''}
                      alt=""
                      sizes="400px"
                    />
                  </div>

                  {/* OVERLAY */}
                  <div
                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    // onClick={handleOpenModalImageGallery}
                  />
                </div>
              ))}

            <button
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
              // onClick={handleOpenModalImageGallery}
            >
              <Squares2X2Icon className="w-5 h-5" />
              <span className="ml-2 text-neutral-800 text-sm font-medium">Show all photos</span>
            </button>
          </div>
        </header>

        {/* MAIN */}
        <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
          {/* CONTENT */}
          <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
            {renderSection1()}
            {renderSection2()}
            {renderSection3()}
            {renderSection4()}
            {renderSection8()}
          </div>

          {/* SIDEBAR */}
          <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
            <div className="sticky top-28">{renderSidebar()}</div>
          </div>
        </main>
      </div>
    </DetailPagetLayout>
  );
};

// export default function SectionHeroArchivePage() {
//   return (
//     <DetailPagetLayout>
//       <StayDetailPageContainer />
//     </DetailPagetLayout>
//   );
// }

export default HeroArchivePage;
