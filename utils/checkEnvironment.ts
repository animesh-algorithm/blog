const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://blog.animesharma3.com";

  return base_url;
};

export default checkEnvironment;
