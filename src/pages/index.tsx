import React from 'react'

const index = () => {
  return (
    <div>
      <h1 className="font-fraunces font-bold text-4xl">Fraunces Bold</h1>
      <p className="font-fraunces font-light italic">
        Fraunces Light Italic with Variable Font
      </p>
      <p
        className="font-fraunces"
        style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}
      >
        Fraunces with SOFT 100 & WONK 1
      </p>
      <h1 className="font-futura font-bold text-4xl">Futura Bold</h1>
      <p className="font-futura font-light italic">
        Futura Light Italic with Variable Font
      </p>
      <p
        className="font-futura font-bold"
      >
        Futura
      </p>

    </div>
  )
}

export default index