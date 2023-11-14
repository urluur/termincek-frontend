import React, { useState } from 'react'

const ServiceChooser = (props) => {

  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const filteredServices = props.services.filter(service => {
    return service.name.toLowerCase().includes(searchValue.toLowerCase());
  })

  return (
    <div>

      <h2>Storitve</h2>
      <input
        type='text'
        placeholder={props.placeholder || "Search"}
        value={searchValue}
        onChange={handleSearch}
        className='border p-1'
      />
      <table className='table-auto w-full'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='text-left px-4 py-2'>Ime</th>
            <th className='text-left px-4 py-2'>Čas</th>
            <th className='text-left px-4 py-2'>Cena</th>
          </tr>
        </thead>
        {
          filteredServices.map((service, i) => {
            return (
              <tr key='i' className={i % 2 === 1 ? 'bg-gray-100' : ''}>
                <td className='text-left px-4 py-2 '>
                  <button>
                    {service.name}
                  </button>
                </td>
                <td className='text-left px-4 py-2'>{service.time} min</td>
                <td className='text-left px-4 py-2'>{service.price}€</td>
              </tr>
            )
          })
        }
      </table>

    </div>
  )
}

export default ServiceChooser