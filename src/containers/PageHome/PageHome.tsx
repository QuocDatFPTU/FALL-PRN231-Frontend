import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import SectionHero from "components/SectionHero/SectionHero";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import { TaxonomyType } from "data/types";
import { useEffect, useState } from "react";
import destinationApi, { destinationsType } from "./../../api/destinationApi";
import SectionVideos from "./SectionVideos";

// const DEMO_CATS: TaxonomyType[] = [
//   {
//     id: "1",
//     href: "/listing-stay",
//     name: "New Yourk",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "/listing-stay",
//     name: "Singapore",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "/listing-stay",
//     name: "Paris",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "/listing-stay",
//     name: "London",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "/listing-stay",
//     name: "Tokyo",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     id: "2",
//     href: "/listing-stay",
//     name: "Maldives",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
// ];

// const DEMO_CATS_2: TaxonomyType[] = [
//   {
//     id: "1",
//     href: "/listing-stay",
//     name: "Enjoy the great cold",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//   },
//   {
//     id: "222",
//     href: "/listing-stay",
//     name: "Sleep in a floating way",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "3",
//     href: "/listing-stay",
//     name: "In the billionaire's house",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "4",
//     href: "/listing-stay",
//     name: "Cool in the deep forest",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   {
//     id: "5",
//     href: "/listing-stay",
//     name: "In the billionaire's house",
//     taxonomy: "category",
//     count: 188288,
//     thumbnail:
//       "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
// ];

function PageHome() {
  const [destination, setDestinations] = useState<TaxonomyType[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await destinationApi.getAll();
      const list = data.data
        .filter((x: destinationsType) => x.status != 0)
        .map((e: destinationsType) => {
          return {
            id: e.id,
            href: `/listing-stay/${e.id}`,
            name: e.name,
            taxonomy: "category",
            count: 188288,
            thumbnail: e.destinationImages[0].image,
          };
        });
      setDestinations(list);
      //console.log("list",data);
    })();
  }, []);

  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero className="pt-10 lg:pt-16 lg:pb-16" />
        {/* SECTION 1 */}
        {destination?.length !== 0 && (
          <SectionSliderNewCategories
            categories={destination}
            uniqueClassName="PageHome_s1"
          />
        )}
        {/* SECTION2 */}
        <SectionOurFeatures />
        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          {destination.length !== 0 && (
            <SectionGridFeaturePlaces
              tabs={destination
                .sort(function (a, b) {
                  return Math.random() - 0.5;
                })
                .map((e): any => {
                  return { id: e.id, name: e.name };
                })
                .slice(0, 4)}
            />
          )}
        </div> */}
        {/* SECTION */}
        {/* <SectionHowItWork /> */}
        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          {destination?.length !== 0 && (
            <SectionSliderNewCategories
              categories={destination}
              categoryCardType="card4"
              itemPerRow={4}
              heading="Suggestions for discovery"
              subHeading="Popular places to stay that Chisfis recommends for you"
              sliderStyle="style2"
              uniqueClassName="PageHome_s2"
            />
          )}
        </div>
        {/* SECTION */}
        {/* <SectionSubscribe2 /> */}
        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}
        {/* SECTION */}
        {/* <SectionGridCategoryBox /> */}
        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div> */}
        {/* SECTION 1 */}
        {destination?.length !== 0 && (
          <SectionSliderNewCategories
            categories={destination}
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            uniqueClassName="PageHome_s3"
          />
        )}
        {/* SECTION */}
        <SectionVideos />
        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageHome_" />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
