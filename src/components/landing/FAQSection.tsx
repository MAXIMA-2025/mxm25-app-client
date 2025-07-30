import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQSection = () => {
  return (
    <section className="w-full bg-cover bg-center py-10"
      style={{ backgroundImage: "url('Group 160.svg')" }}>

      <div className="w-full lg:px-81">
        <h2 className="text-left text-5xl font-bold mb-4">FAQ</h2>
        <p className="text-left text-4xl text-gray-600 mb-8">Lorem Dolor Ipsum Amet Sit,
          Haha hihi rafpo!</p>

        <div className="w-full max-w-8xl mx-auto space-y-4 mb-800 ">
          <Accordion type="single" collapsible className="w-full space-y-4" >
            <AccordionItem value="item-1" className="bg-white rounded-md shadow-md border">
              <AccordionTrigger className="!bg-white !text-black px-9 py-9 text-left hover:no-underline data-[state=open]:!bg-white ">
                Title 1</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-gray-700 text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus sit esse consectetur aperiam eaque ab, sapiente perferendis veniam repellendus.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-md shadow-md border">
              <AccordionTrigger className="!bg-white !text-black px-9 py-9 text-left hover:no-underline data-[state=open]:!bg-white">
                Title 2</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, alias.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-md shadow-md border">
              <AccordionTrigger className="!bg-white !text-black px-9 py-9 text-left hover:no-underline data-[state=open]:!bg-white">
                Title 3</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-gray-700">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed est, quae in necessitatibus aliquam nam. Quaerat nostrum asperiores rerum quas!
              </AccordionContent>
            </AccordionItem>
          

          <AccordionItem value="item-4" className="bg-white rounded-md shadow-md border">
              <AccordionTrigger className="!bg-white !text-black px-9 py-9 text-left hover:no-underline data-[state=open]:!bg-white">
                Title 4</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, unde!
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>

      </div>


    </section>
  )
}

export default FAQSection