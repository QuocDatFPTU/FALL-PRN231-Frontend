import React, { FC, ReactNode, useEffect, useState } from 'react';
import { DEMO_STAY_LISTINGS } from 'data/listings';
import { StayDataType, StayDataTypeNew } from 'data/types';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import HeaderFilter from './HeaderFilter';
import StayCard from 'components/StayCard/StayCard';
import { HotelTypeNew, tourType } from 'api/hotelApi';
import { DEMO_STAY_CATEGORIES } from 'data/taxonomies';
import { DEMO_AUTHORS } from 'data/authors';
import hotelApi from 'api/hotelApi';
import moment from 'moment';

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: {
    id: any;
    name: any;
  }[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = '',
  heading = 'Featured places to stay',
  subHeading = 'Popular tours that Chisfis recommends for you',
  headingIsCenter,
  tabs
}) => {
  const [tourList, setTourList] = useState<HotelTypeNew[]>([]);
  const [card, setCard] = useState([]);
  const [tabActiveState, setTabActiveState] = useState(tabs![0].id);

  useEffect(() => {
    (async () => {
      const { data } = await hotelApi.getById({ cityId: Number(tabActiveState) });
      setTourList(data);
      const hotelList = data.data.contends.map((e: HotelTypeNew) => {
        return {
          id: e.id,
          authorId: (e.createdBy ??= '1'),
          date: e.createdAt,
          href: `/listing-tour/${e.id}`,
          listingCategoryId: e.categoryId,
          title: e.name,
          featuredImage:
            e.hotelImages.length !== 0
              ? e.hotelImages[0].imageUrl
              : 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          galleryImgs:
            e.hotelImages.length !== 0
              ? e.hotelImages.map((e) => e.imageUrl)
              : [
                  'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                  'https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                  'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                ],
          commentCount: e.reviewCount,
          viewCount: e.reviewCount ?? 30,
          like: false,
          address: `${e.address?.area?.name}, ${e.address.city.name}`,
          reviewStart: e.reviewRatting,
          reviewCount: e.reviewCount ?? 30,
          price:
            e.pricePerNight !== null
              ? e.pricePerNight.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : '1,000,000',
          maxGuests: 4,
          bedrooms: 10,
          bathrooms: 3,
          // saleOff: '-10% today',
          isAds: null,
          map: { lat: 55.2094559, lng: 61.5594641 },
          checkInDate: moment(Date.now()).format('YYYY-MM-DD'),
          checkOutDate: moment(Date.now() + 2).format('YYYY-MM-DD')
        };
      });
      console.log('hotel', hotelList);
      setCard(
        hotelList
        // .map((post: any, index: any): StayDataType => {
        //   //  ##########  GET CATEGORY BY CAT ID ######## //
        //   const category = DEMO_STAY_CATEGORIES.filter(
        //     (taxonomy) => taxonomy.id === post.listingCategoryId
        //   )[0];

        //   return {
        //     ...post,
        //     id: `stayListing_${index}_`,
        //     saleOff: !index ? '-20% today' : post.saleOff,
        //     isAds: !index ? true : post.isAds,
        //     author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
        //     listingCategory: category
        //   };
        // })
      );
    })();
  }, [tabActiveState]);

  const renderCard = (stay: StayDataTypeNew) => {
    return <StayCard key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      {tabs && tabs.length !== 0 && (
        <HeaderFilter
          tabActiveState={tabActiveState}
          setTabActiveState={setTabActiveState}
          subHeading={subHeading}
          tabs={tabs}
          heading={heading}
          onClickTab={() => {}}
        />
      )}
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}>
        {/* {DEMO_DATA.map((stay) => renderCard(stay))} */}
        {card.length !== 0 && card.map((tour) => renderCard(tour))}
      </div>
      {/* <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div> */}
    </div>
  );
};

export default SectionGridFeaturePlaces;
