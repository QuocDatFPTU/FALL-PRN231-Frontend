import { destinationsType } from 'api/destinationApi';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import SectionHeroArchivePage from 'components/SectionHeroArchivePage/SectionHeroArchivePage';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useParams } from 'react-router-dom';
import destinationApi from './../../api/destinationApi';
import SectionGridFilterCard from './SectionGridFilterCard';
import hotelApi, { HotelDetailypeNew } from 'api/hotelApi';
import moment from 'moment';
import HeroArchivePage from 'components/SectionHeroArchivePage/SectionHeroArchivePage';

export interface ListingStayPageProps {
  className?: string;
}

const ListingStayPage: FC<ListingStayPageProps> = ({ className = '' }) => {
  const { id } = useParams();
  const { state } = useLocation();
  const [hotelDetail, setHotelDetail] = useState<HotelDetailypeNew>();
  const [isLoading, setIsLoading] = useState(true);
  console.log('state', state);

  let payload;
  useEffect(() => {
    (async () => {
      if (state) {
        payload = {
          hotelId: Number(id),
          quantity: state.quantity,
          searchCriteria: {
            checkInDate: state.checkInDate,
            checkOutDate: state.checkOutDate
          }
        };
        const res = await hotelApi.getHotelById(Number(id), payload);

        const hotelDetail: HotelDetailypeNew = {
          id: res.data.id,
          authorId: (res.data.createdBy ??= '1'),
          createdAt: res.data.createdAt,
          categoryId: res.data.categoryId,
          category: res.data.category,
          reviewRatting: res.data.reviewRatting,
          reviewCount: res.data.reviewCount ?? 30,
          address: `${res.data.address?.area?.name}, ${res.data.address.city.name}`,
          // pricePerNight:
          //   res.data.pricePerNight !== null
          //     ? res.data.pricePerNight.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          //     : '1,000,000',
          name: res.data.name,
          phoneNumber: res.data.phoneNumber,
          notes: res.data.notes,
          websiteAddress: res.data.websiteAddress,
          hotelImages:
            res.data.hotelImages.length !== 0
              ? res.data.hotelImages.map((e: any) => ({ imageUrl: e.imageUrl, id: 1 }))
              : [
                  'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                  'https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                  'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                ],
          createdBy: res.data.createdBy,
          modifiedBy: res.data.createdBy,
          modifiedAt: res.data.createdBy,
          hotelFacilityHighlights: res.data.hotelFacilityHighlights,
          hotelGroups: res.data.hotelsGroups,
          masterRooms: res.data.masterRooms,
          soldOutRooms: res.data.soldOutRooms,
          quantity: state.quantity,
          description: res.data.description,
          checkInDate: state.checkInDate,
          checkOutDate: state.checkOutDate
        };
        console.log('object', hotelDetail);

        setHotelDetail(hotelDetail);
        setIsLoading(false);
      } else {
        payload = {
          hotelId: Number(id),
          quantity: 2,
          searchCriteria: {
            checkInDate: moment(Date.now()).format('YYYY-MM-DD'),
            checkOutDate: moment(Date.now()).format('YYYY-MM-DD')
          }
        };
        console.log('dmmmm');
        const res = await hotelApi.getHotelById(Number(id), payload);
        const hotelDetail: HotelDetailypeNew = {
          id: res.data.id,
          authorId: (res.data.createdBy ??= '1'),
          createdAt: res.data.createdAt,
          categoryId: res.data.categoryId,
          category: res.data.category,
          reviewRatting: res.data.reviewRatting,
          reviewCount: res.data.reviewCount ?? 30,
          address: `${res.data.address?.area?.name}, ${res.data.address.city.name}`,
          // pricePerNight:
          //   res.data.pricePerNight !== null
          //     ? res.data.pricePerNight.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          //     : '1,000,000',
          name: res.data.name,
          phoneNumber: res.data.phoneNumber,
          notes: res.data.notes,
          websiteAddress: res.data.websiteAddress,
          hotelImages:
            res.data.hotelImages.length !== 0
              ? res.data.hotelImages.map((e: any) => e.imageUrl)
              : [
                  'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                  'https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                  'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                ],
          createdBy: res.data.createdBy,
          modifiedBy: res.data.createdBy,
          modifiedAt: res.data.createdBy,
          hotelFacilityHighlights: res.data.hotelFacilityHighlights,
          hotelGroups: res.data.hotelsGroups,
          masterRooms: res.data.masterRooms,
          soldOutRooms: res.data.soldOutRooms,
          quantity: 2,
          description: res.data.description,
          checkInDate: moment(Date.now()).format('YYYY-MM-DD'),
          checkOutDate: moment(Date.now()).format('YYYY-MM-DD')
        };
        setHotelDetail(hotelDetail);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage">
      <Helmet>
        <title>Chisfis || Tour Booking</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        {/* SECTION HERO */}
        {isLoading ? (
          <div className="flex justify-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <HeroArchivePage
            data={hotelDetail!}
            currentPage="Rooms"
            currentTab="Rooms"
            className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
          />
        )}

        {/* SECTION */}
        {/* <SectionGridFilterCard className="pb-24 lg:pb-28" /> */}

        {/* SECTION 1 */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingStayMapPage"
          />
        </div> */}

        {/* SECTION */}
        {/* <SectionSubscribe2 className="py-24 lg:py-28" /> */}

        {/* SECTION */}
        {/* <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}
      </div>
    </div>
  );
};

export default ListingStayPage;
