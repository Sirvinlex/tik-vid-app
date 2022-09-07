import React from 'react'

const FormInput = ({type, name, value,  handleChange, labelText, page,placeholder }) => {
  return (
    <>
      <label htmlFor={name}>{labelText}</label>
      <input className={page === 'navbar' ? 'input' : 'form-input'} 
       type={type} name={name}
       value={value} id={name} 
       onChange={handleChange}
       placeholder={placeholder}
      />
    </>
  )
}

export default FormInput