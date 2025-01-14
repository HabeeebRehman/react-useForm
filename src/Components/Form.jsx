import React from'react'
import './Form.css'
import { useForm } from 'react-hook-form'

const Form = () => {
  const { register, handleSubmit, formState:{errors, isSubmitSuccessful , isSubmitting} } = useForm()

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
  }

  return (
    <div className='Form-container'>
       
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
    {isSubmitSuccessful ? <div className='status'> <h2>Registration Sucessfull !!!</h2></div>: null}
      <div>
      <input type="text" placeholder="First name" {...register('firstName', {
        required: 'First name is required',
        pattern:{
            value:/^[a-zA-Z]+$/,
            message:"Invalid first name"
        }
      })} />
      {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
      <input type="text" placeholder="Last name" {...register('lastName', {
        required: 'Last name is required'
      })} />
      {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <div>
      <input type="text" placeholder="Email" {...register('email', {
        required: 'Email is required',
        validate: (value) => {
          if (!value.includes('@')) {
            return 'Invalid email'
          }
        },
        pattern:{
            value:/^\S+@\S+\.\S+$/,
            message:"Invalid email"
        }
      })} />
      {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
      <input type="password" placeholder="Password" {...register('pass', {
        required: 'Password is required',
        minLength: {
          value: 4,
          message: 'Password must be at least 4 characters'
        },
        maxLength: {
          value: 20,
          message: 'Password must be less than 20 characters'
        }
      })}/>
      {errors.pass && <p>{errors.pass.message}</p>}
      </div>
      <button disabled={isSubmitting} type="submit">{isSubmitting ? "Loading..." : "Submit"}</button>
    </form>

    </div>
  )
}

export default Form