import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const listingId = params.listingId;
        // console.log(listingId);

        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          console.log(data.message);
          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, []);
  return (
    <main>
      {loading && <p className="text-center text-2xl py-7">Loading...</p>}
      {error && (
        <p className="text-center text-2xl py-7">Something went wrong</p>
      )}
      {listing && !error && !loading && (
        <Swiper navigation>
          {listing.imageUrls.map((imageUrl, index) => (
            <SwiperSlide key={imageUrl}>
              <div
                className="h-[550px]"
                style={{ background: `url(${imageUrl}) center no-repeat` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </main>
  );
}

export default Listing;
