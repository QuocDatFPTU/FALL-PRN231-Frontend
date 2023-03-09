import React, { FC, ReactNode, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import tourApi, { tourType } from "api/tourApi";

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
  gridClass = "",
  heading = "OUR TOURS",
  subHeading = "Popular tours that Chisfis recommends for you",
  headingIsCenter,
  tabs,
}) => {
  const [tourList, setTourList] = useState<tourType>();
  const [tabActiveState, setTabActiveState] = useState(tabs![0].id);
  useEffect(() => {
    (async () => {
      const { data } = await tourApi.getById(tabActiveState);
      console.log(data);
      setTourList(data);
    })();
  }, [tabActiveState]);

  const renderCard = (stay: StayDataType) => {
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
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {/* {DEMO_DATA.map((stay) => renderCard(stay))} */}
      </div>
      {/* <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div> */}
    </div>
  );
};

export default SectionGridFeaturePlaces;
