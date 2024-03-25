import { useForm } from 'react-hook-form';
import banner from '../../../../assets/banner.jpeg';

const Banner = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const value = data.search;
    // Do something with the search value, such as passing it to a parent component or performing a search operation
    console.log('Search Value:', value);
  };

  return (
    <div
      className="relative overflow-hidden bg-cover bg-center md:h-[500px] h-[300px] shadow-lg"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-wide">Find Your Dream Job</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center">
            <input
              type="text"
              {...register("search")}
              placeholder="Enter job title or keyword"
              className="py-3 px-4 rounded-lg border-none bg-white text-gray-800 w-full md:max-w-md mb-4 md:mb-0 md:mr-2 shadow-md"
              style={{ flex: 1 }}
            />
            <button type="submit" className="buttons ml-2">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
