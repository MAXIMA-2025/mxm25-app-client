import React from 'react'

const AboutSection = () => {
  return (
    <section
  className="h-300 w-full bg-no-repeat bg-cover bg-center mx-auto mt-10 mb-10 py-10"
      style={{ backgroundImage: "url('image 2 (1).png')" }}
>

      <div className="w-full lg:px-81">
        <h2 className="text-left text-5xl font-bold mb-4">APA ITU MAXIMA?</h2>
        <h4 className="text-left text-4xl font-normal mb-4">Lorem Dolor Ipsum Amet Sit, Haha hihi rafpo!</h4>

        <div className="grid gap-11 w-full max-w-[3000px] mx-auto"
     style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>


          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src="/272311f27195380fedb463f941350cd49b48f0f7.png"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/100 to-transparent z-10"></div>

            <div className="absolute bottom-20 left-4 text-white text-lg font-semibold drop-shadow-md z-20">
              <h3 className="text-white text-3xl font-medium">Lorem Dolor Ipsum</h3>
              <h3 className="text-white text-3xl font-medium"> Amet Sit, </h3>
              <h3 className="text-white text-3xl font-medium"> Haha hihi rafpo! </h3>
            </div>
          </div>



          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src="/272311f27195380fedb463f941350cd49b48f0f7.png"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/100 to-transparent z-10"></div>

            <div className="absolute bottom-20 left-4 text-white text-lg font-semibold drop-shadow-md z-20">
              <h3 className="text-white text-3xl font-medium">Lorem Dolor Ipsum</h3>
              <h3 className="text-white text-3xl font-medium"> Amet Sit, </h3>
              <h3 className="text-white text-3xl font-medium"> Haha hihi rafpo! </h3>
            </div>
          </div>


          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src="/272311f27195380fedb463f941350cd49b48f0f7.png"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/100 to-transparent z-10"></div>

            <div className="absolute bottom-20 left-4 text-white text-lg font-semibold drop-shadow-md z-20">
              <h3 className="text-white text-3xl font-medium">Lorem Dolor Ipsum</h3>
              <h3 className="text-white text-3xl font-medium"> Amet Sit, </h3>
              <h3 className="text-white text-3xl font-medium"> Haha hihi rafpo! </h3>
            </div>

          </div> 
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
