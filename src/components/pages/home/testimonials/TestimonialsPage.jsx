import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TestimonialsPage = () => {
  const axiosPublic = useAxiosPublic();

  const { data: review = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosPublic.get("/review");
      return res.data;
    },
  });

  return (
    <div className="my-8 md:my-20 w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold uppercase">Testimonials</h1>
      </div>
      <div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {review.map((rev) => (
            <SwiperSlide key={rev._id}>
              <div className="px-2 md:px-4 py-4 md:py-6">
                <p className="mt-3 md:mt-4 text-base md:text-lg text-center">{rev.testimonial}</p>
                <h2 className="mt-3 md:mt-4 text-lg md:text-xl font-bold text-center">
                  {rev.name}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialsPage;
