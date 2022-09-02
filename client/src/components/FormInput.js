import React from 'react'

const FormInput = ({type, name, value,  handleChange, labelText, page }) => {
  return (
    <>
      <label htmlFor={name}>{labelText}</label>
      <input className={page === 'navbar' ? 'input' : 'form-input'} type={type} name={name} value={value} id={name} onChange={handleChange}/>
    </>
  )
}

export default FormInput