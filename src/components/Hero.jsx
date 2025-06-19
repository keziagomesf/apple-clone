import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const getVideoSrc = () =>
      window.innerWidth < 760 ? smallHeroVideo : heroVideo;

    setVideoSrc(getVideoSrc());

    const handleResize = () => {
      setVideoSrc(getVideoSrc());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Autoplay failed:', error);
        });
      }
    }
  }, [videoSrc]);

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 });
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          {videoSrc && (
            <video
              ref={videoRef}
              className="pointer-events-none"
              autoPlay
              muted
              playsInline
              preload="auto"
              key={videoSrc}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
