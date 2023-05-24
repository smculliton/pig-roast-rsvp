import React, { useState, useEffect, useSyncExternalStore } from 'react'
import sideLimits from '@/data/side-limits'

function Page() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sideDish: '',
  })

  const [Rsvps, setRsvps] = useState([])
  const [sides, setSides] = useState(sideLimits)
  const [loading, setLoading] = useState(false)
  const [entered, setEntered] = useState(false)
  const [invalidRsvp, setInvalidRsvp] = useState(false)

  useEffect(() => {
    fetch('/api/get-rsvps', {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        setRsvps(data.rsvps)
        let sidesDecrement = sides 
        data.rsvps.forEach(r => (sidesDecrement[r.side] -= 1))
        setSides(sidesDecrement)
      })
  }, [])

  const fullName = () => {
    return `${formData.firstName} ${formData.lastName}`
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))  
  }

  const handleClick = async (e) => {
    setLoading(true)
    setEntered(false)
    setInvalidRsvp(false)

    if (alreadyRsvpd()) {
      setInvalidRsvp(true)
    } else {
      try {
        const response = await fetch('/api/add-row',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
      } catch (error) {
        console.log(error)
      }

      setEntered(true)
      setRsvps([...Rsvps, { fullName: fullName(), side: formData.sideDish }])
      setSides((prevSides) => ({
        ...prevSides,
        [formData.sideDish]: sides[formData.sideDish] - 1,
      }))
    }

    setLoading(false)
  }

  const alreadyRsvpd = () => {
    return Rsvps.filter(rsvp => rsvp.fullName === fullName()).length > 0
  }

  return (
    <>
      <h1>2nd ANNUAL CULLITON PIG ROAST RSVP</h1>
      <h3>Congrats you've been invited to the roast!</h3>
      <h2>General Info</h2>
      <p>Location: 210 Sugar Pine Ln, Fairplay, CO 80440</p>
      <p>Date: June freakin' 17th baby</p>
      <h2 style={{ color: 'aquamarine' }}>RSVP</h2>
      <label>First Name: </label>
      <input  
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />

      <br/>
      <label>Last Name: </label>
      <input  
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />

      <br/>
      <label>Side Dish: </label>
      <select 
        name="sideDish"
        onChange={handleChange}
        defaultValue={'placeholder'}
      >
        <option disabled={true} value='placeholder'>pick a side... any side</option>
        {Object.keys(sides).map(side => (
          <option 
            value={side}
            disabled={sides[side] === 0}
          >
            {`${side}: ${sides[side]} left`}
          </option>
        ))}
      </select>

      <br/>

      { loading ? 'Holdd uP... onE SeC' :
        <button
          onClick={handleClick}
        >
          Enter
        </button>
      }
      
      {invalidRsvp && <h2>You're allready in the SpreadshEet 😅</h2>}
      {entered && <h2>Noice You've RSVP'd!! 🐗🔥🎉</h2>}

      <br/><br/>
      <a href="https://docs.google.com/spreadsheets/d/1K-ALlp-dqYRLd2VdG_nS4rEc6dmFWuMAuX_KUYStb3k/edit#gid=0">
        Manually Edit Spreadsheet Even Though Sean Obviously Put a Ton of Effort Into This Website. Or Maybe You Messed Up What Side You're Bringing. Or Maybe You Just Want to See Who All Is Coming. Sean Won't Take It Personally... Either Way, CLICK HERRE
      </a>
    </>
  )
}

export default Page