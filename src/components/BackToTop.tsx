const GoToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div onClick={scrollToTop} className="container-top">
        <div className="go-top"></div>
      </div>
    </>
  );
};

export default GoToTopButton;
