import React, { ReactNode } from "react";
import { imageGallery as listingStayImageGallery } from "contains/cons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ListingImageGallery from "components/ListingImageGallery/ListingImageGallery";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
// import MobileFooterSticky from "./(components)/MobileFooterSticky";

const DetailPagetLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const thisPathname = useLocation().pathname;
  const [searchParams] = useSearchParams();
  const modal = searchParams?.get("modal");

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    navigate(`${thisPathname}/?${params.toString()}`);
  };

  const getImageGalleryListing = () => {
    if (thisPathname?.includes("/listing-stay-detail")) {
      return listingStayImageGallery;
    }
    return [];
  };

  return (
    <div className="ListingDetailPage">
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={getImageGalleryListing()}
      />

      <div className="container ListingDetailPage__content">{children}</div>

      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingDetailPage"
          />
        </div>
        <SectionSubscribe2 className="pt-24 lg:pt-32" />
      </div>

      {/* STICKY FOOTER MOBILE */}
      {/* <MobileFooterSticky /> */}
    </div>
  );
};

export default DetailPagetLayout;
