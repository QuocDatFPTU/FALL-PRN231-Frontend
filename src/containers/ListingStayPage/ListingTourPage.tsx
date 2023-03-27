import destinationApi, { destinationsType } from 'api/destinationApi'
import tourApi, { tourType } from 'api/tourApi'
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism'
import Heading2 from 'components/Heading/Heading2'
import StayCard from 'components/StayCard/StayCard'
import { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Pagination from 'shared/Pagination/Pagination'

export interface ListingStayPageProps {
  className?: string
}

const ListingTourPage: FC<ListingStayPageProps> = ({ className = '' }) => {
  //const { id } = useParams()

  const [card, setCard] = useState([])
  // const [tour, setTour] = useState<tourType>();
  // const [destination, setDestination] = useState<destinationsType>();

  useEffect(() => {
    (async () => {
      try {
        const [destinationsResponse, toursResponse] = await Promise.all([
          destinationApi.getAll(),
          tourApi.getAll(),
        ]);
  
        const destinations = destinationsResponse.data.data;
        const tours = toursResponse.data.data;
  
        const newCard = tours.map((e: tourType) => {
          const destination = destinations.find((d: destinationsType) => d.id === e.tourDetails[0].destination.id);
          return {
            id: e.id,
            authorId: 10,
            date: 'May 20, 2021',
            href: `/listing-stay-detail/${e.id}`,
            listingCategoryId: 17,
            title: e.tourName,
            galleryImgs: e.tourDetails[0].destination.destinationImages.map((x) => x.image).slice(0, 3),
            commentCount: 70,
            viewCount: 602,
            like: false,
            address: e.tourDetails.map((x) => x.destination.name),
            reviewStart: 4.8,
            reviewCount: 28,
            //price: e.cost.toString(),
            maxGuests: e.tourCapacity,
            bedrooms: e.tourCapacity,
            bathrooms: 3,
            saleOff: '-10% today',
            isAds: null,
            map: { lat: 55.2094559, lng: 61.5594641 },
            destination,
          }
        })
        setCard(newCard);
        console.log('card',newCard);
        
      } catch (error) {
        // handle error
      }
    })()
  }, [])
  

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingTourPage"
    >
      <Helmet>
        <title>Chisfis || Tour List</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        {/* SECTION */}
        <div
          className={`nc-SectionGridFilterCard ${className}`}
          data-nc-id="SectionGridFilterCard"
        >
          <Heading2 />

          {/* <div className="mb-8 lg:mb-11">
            <TabFilters />
          </div> */}
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {card?.map((stay: any) => (
              <StayCard key={stay.id} data={stay} />
            ))}
          </div>
          <div className="flex mt-16 justify-center items-center">
            <Pagination />
          </div>
          <br></br>
        </div>
      </div>
    </div>
  )
}

export default ListingTourPage
