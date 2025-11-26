import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const column1Images = [
  { imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Connection', color: 'matcha' },
  { imageUrl: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Giving', color: 'peach' },
  { imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Growth', color: 'matcha' },
  { imageUrl: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Inspiration', color: 'butter' },
];

const column2Images = [
  { imageUrl: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Community', color: 'peach' },
  { imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Create', color: 'lilac' },
  { imageUrl: 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Inspire', color: 'butter' },
  { imageUrl: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Hope', color: 'matcha' },
];

const column3Images = [
  { imageUrl: 'https://images.pexels.com/photos/935743/pexels-photo-935743.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Transform', color: 'lilac' },
  { imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Joy', color: 'butter' },
  { imageUrl: 'https://images.pexels.com/photos/1322197/pexels-photo-1322197.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Love', color: 'peach' },
  { imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'Purpose', color: 'matcha' },
];

export default function ProofOfHumanity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(col1Ref.current, {
      y: -80,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    gsap.to(col2Ref.current, {
      y: 80,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    gsap.to(col3Ref.current, {
      y: -80,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="py-24 px-6 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-4">
            Proof of Humanity
          </h2>
          <p className="text-xl font-hand text-peach">
            Small moments, big impact
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div ref={col1Ref} className="flex flex-col gap-6">
            {column1Images.map((item, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl border border-forest/10 shadow-md hover:shadow-lg transition-all duration-500 ease-out hover:-rotate-1`}
                style={{ height: index % 2 === 0 ? '220px' : '280px' }}
              >
                <img src={item.imageUrl} alt={item.label} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-${item.color}/40 backdrop-blur-[2px]`} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-forest/80 to-transparent">
                  <h3 className="text-lg font-serif font-bold text-white">
                    {item.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div ref={col2Ref} className="flex flex-col gap-6 pt-12">
            {column2Images.map((item, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl border border-forest/10 shadow-md hover:shadow-lg transition-all duration-500 ease-out hover:rotate-1`}
                style={{ height: index % 2 === 0 ? '240px' : '300px' }}
              >
                <img src={item.imageUrl} alt={item.label} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-${item.color}/40 backdrop-blur-[2px]`} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-forest/80 to-transparent">
                  <h3 className="text-lg font-serif font-bold text-white">
                    {item.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div ref={col3Ref} className="flex flex-col gap-6">
            {column3Images.map((item, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl border border-forest/10 shadow-md hover:shadow-lg transition-all duration-500 ease-out hover:-rotate-1`}
                style={{ height: index % 2 === 0 ? '230px' : '290px' }}
              >
                <img src={item.imageUrl} alt={item.label} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-${item.color}/40 backdrop-blur-[2px]`} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-forest/80 to-transparent">
                  <h3 className="text-lg font-serif font-bold text-white">
                    {item.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
