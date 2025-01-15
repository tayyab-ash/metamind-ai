import React from 'react'
import fahad from '@/assets/fahad.jpg'
import parh from '@/assets/parh.jpg'
import rahul from '@/assets/rahul.avif'
import sanket from '@/assets/sanket.avif'

const Contributors = () => {
    const contributors = [
        {
          name: "Fahad Abbas",
          linkedin: "https://www.linkedin.com/in/fahadabbas-3042b0212/",
          image: fahad,
        },
        {
          name: "Rahul",
          linkedin: "https://www.linkedin.com/in/rahulsinghds/",
          image: rahul,
        },
        {
          name: "Sanket",
          linkedin:
            "https://www.linkedin.com/in/sanket-bodake-166a56294/?utm_source=share&amp;utm_campaign=share_via&amp;utm_content=profile&amp;utm_medium=android_app",
          image: sanket,
        },
        {
          name: "Puroshotam",
          linkedin:
            "https://www.linkedin.com/in/puroshotam-singh/",
          image: parh,
        },
      ];
  return (
    <div className=''>
        <div className="contributors mt-32 flex flex-col gap-10 items-center">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Our Contributors
        </h2>
        <div className="contributor-profiles flex flex-wrap justify-center gap-6 md:gap-10">
          {contributors.map((contributor, index) => (
            <div
              key={index}
              className="contributor text-center flex flex-col items-center mb-12"
            >
              <a
                href={contributor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={contributor.image}
                  alt={contributor.name}
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain rounded-full border-2 border-cyan-500 hover:scale-105 transition-transform"
                />
              </a>
              <p className="text-white mt-2">{contributor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contributors