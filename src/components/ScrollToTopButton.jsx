import { useState, useEffect } from 'react';
import { IoIosArrowDropup } from "react-icons/io";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
    >
      <IoIosArrowDropup className='text-white'/>
    </button>
  );
};

export default ScrollToTopButton;
