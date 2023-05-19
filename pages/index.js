import React, { useState } from 'react'

function Page() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sideDish: '',
    numberPeople: 1
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'numberPeople' ? Number(value) : value
    }))
  }

  const handleClick = async (e) => {
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
  }

  return (
    <>
      <h1>2nd ANNUAL CULLITON PIG ROAST RSVP</h1>
      <h3>Congrats you've been invited to the roast!</h3>
      <h2>General Info</h2>
      <p>Location: --cabin addresss here--</p>
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
      <input  
        type="text"
        name="sideDish"
        value={formData.sideDish}
        onChange={handleChange}
      />

      <br/>
      <label># of People: </label>
      <select  
        name="numberPeople"
        value={formData.numberPeople}
        onChange={handleChange}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
      </select>
      <br/>

      <button
        onClick={handleClick}
      >
        Enter
      </button>

      <br/><br/>
      <a href="https://docs.google.com/spreadsheets/d/1K-ALlp-dqYRLd2VdG_nS4rEc6dmFWuMAuX_KUYStb3k/edit#gid=0">
        Manually Edit Spreadsheet Even Though Sean Obviously Put a Ton of Effort Into This Website. Or Maybe You Messed Up What Side You're Bringing. Or Maybe You Just Want to See Who All Is Coming. Sean Won't Take It Personally... Either Way, CLICK HERRE
      </a>
    </>
  )
}

export default Page