import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { schema, Schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-6 lg:py-32'>
          <div className='lg:col-span-2 lg:col-start-3'>
            <form className='rounded-2xl bg-white p-10 shadow-2xl' onSubmit={onSubmit} noValidate>
              <div className='text-2xl pb-5 mb-5 text-center'>Đăng nhập</div>
              <div className='flex flex-col items-center'>
                <button className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'>
                  <div className='bg-white p-2 rounded-full'>
                    <svg className='w-4' viewBox='0 0 533.5 544.3'>
                      <path
                        d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                        fill='#4285f4'
                      />
                      <path
                        d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                        fill='#34a853'
                      />
                      <path
                        d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                        fill='#fbbc04'
                      />
                      <path
                        d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                        fill='#ea4335'
                      />
                    </svg>
                  </div>
                  <span className='ml-4'>Đăng nhập với Google</span>
                </button>
              </div>

              <div className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Hoặc đăng nhập với Email
                </div>
              </div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full rounded-lg items-center justify-center bg-[#46daee] py-4 px-2 text-lg text-white hover:bg-[#54ced4]'
                  // isLoading={loginMutation.isLoading}
                  // disabled={loginMutation.isLoading}
                >
                  <div className='flex items-center'>
                    <svg
                      className='w-6 h-6 mr-2'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                      <circle cx='8.5' cy='7' r='4' />
                      <path d='M20 8v6M23 11h-6' />
                    </svg>
                    Đăng nhập
                  </div>
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-[#3cc9db]' to='/register'>
                  <b> Đăng ký</b>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
