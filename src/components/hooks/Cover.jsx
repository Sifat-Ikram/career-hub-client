const Cover = ({ img, title }) => {
  return (
    <div
      className="hero relative mb-10"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "400px",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold uppercase text-white">{title}</h1>
      </div>
    </div>
  );
};

export default Cover;
