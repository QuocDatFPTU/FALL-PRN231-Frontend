import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import placeApi, { placesType } from "api/placesApi";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import SectionGridFilterCard from "./SectionGridFilterCard";
import tourApi from './../../api/tourApi';

export interface ListingStayPageProps {
  className?: string;
}

const ListingTourPage: FC<ListingStayPageProps> = ({ className = "" }) => {
  const { id } = useParams();

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage"
    >
      <Helmet>
        <title>Chisfis || Tour Booking</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">

        {/* SECTION */}
        <SectionGridFilterCard className="pb-24 lg:pb-28" />

      </div>
    </div>
  );
};

export default ListingTourPage;
