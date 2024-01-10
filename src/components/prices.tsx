'use client'


import { Button, buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
const UpgradeButton=() => {
  const session=useSession()
const isAuthenticated = session.status==='authenticated'
const userId=session.data?.user.id
const isPro=session.data?.user.isPro
const email=session.data?.user.email
  const url=(isAuthenticated && userId && email) ? `https://chatpaperz.lemonsqueezy.com/checkout/buy/1d797c55-f46d-42ce-af38-49f0c1b462d8?checkout[custom][userId]=${userId}&checkout[email]=${email}` : "/auth"
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className='w-full'>
      <Button className='w-full'>
Claim your Discount
      </Button>
    </Link>
  )
}
  const Prices = () => {
  const session=useSession()
  const user=session.data?.user.id
  const isPro=session.data?.user.isPro

  const pricingItems = [
    {
      plan: 'Free',
      tagline: 'For small side projects.',
      quota: 50,
      price: 0,
      features: [
     
        {
          text: '4MB file size limit',
          footnote:
            'The maximum file size of a single document file.',
        },
        {
          text: '20 pages per document',
          footnote:
            'The maximum amount of pages per document-file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
      
      ],
    },
    {
      plan: 'Pro',
      tagline: 'For larger projects with higher needs.',
      quota: 1000,
      price: 59,
      features: [
        {
          text: '400+ pages per document',
          footnote:
            'The maximum amount of pages per document-file.',
        },
        {
          text: '60MB file size limit',
          footnote:
            'The maximum file size of a single document file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote:
            'Better algorithmic responses for enhanced content quality',
        },
        {
          text: 'Priority support',
        },
      ],
    },
  ]

  return (
    <>
      <div className='mb-8 mt-24 text-center max-w-5xl' id='pricing'>
        <div className='mx-auto mb-10 sm:max-w-lg'>
          <h1 className='text-6xl font-bold sm:text-7xl'>
            Pricing
          </h1>
          <p className='mt-5  sm:text-lg'>
            Whether you&apos;re just trying out our service
            or need more, we&apos;ve got you covered.
          </p>
        </div>

        <div className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2'>
          <TooltipProvider>
            {pricingItems.map(
              ({ plan, tagline, quota, features }) => {
               

                return (
                  <div
                    key={plan}
                    className={cn(
                      'relative rounded-2xl shadow-lg',
                      {
                        'border-2 border-blue-600 shadow-blue-200':
                          plan === 'Pro',
                        'border border-gray-200':
                          plan !== 'Pro',
                      }
                    )}>
                    {plan === 'Pro' && (
                      <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-2 text-sm font-medium text-white'>
                        Upgrade now
                      </div>
                    )} 

                    <div className='p-5'>
                      <h3 className='my-3 text-center font-display text-3xl font-bold'>
                        {plan}
                      </h3>
                      <p >
                        {tagline}
                      </p>
                      <div className='my-5 font-display text-6xl font-semibold'>
                      {plan==='Pro'?        <div className="flex items-start justify-center  space-x-5">

<span className="text-green-500 font-bold">$59</span> 
<span className="text-red-500 mr-2 line-through text-3xl text-bold"> {" "}$129 {" "}</span>
</div> : <p>Free</p>} 
                      </div>
                      <p className=''>
                       For a Whole Year of Access
                      </p>
                    </div>

                    <div className='flex h-20 items-center justify-center border-b border-t border-seconday bg-secondary'>
                      <div className='flex items-center space-x-1'>
                        <p>
                          {quota.toLocaleString()} chat messages per day
                        </p>

                        <Tooltip delayDuration={300}>
                          <TooltipTrigger className='cursor-default ml-1.5'>
                            <HelpCircle className='h-4 w-4 ' />
                          </TooltipTrigger>
                          <TooltipContent className='w-80 p-2'>
                            How many chat messages you are allowed to make.
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <ul className='my-10 space-y-5 px-8'>
                      {features.map(
                        ({ text, footnote }) => (
                          <li
                            key={text}
                            className='flex space-x-5'>
                            <div className='flex-shrink-0'>
                           
                                <Check className='h-6 w-6 text-primary' />
                         
                            </div>
                            {footnote ? (
                              <div className='flex items-center space-x-1'>
                                <p
                                 >
                                  {text}
                                </p>
                                <Tooltip
                                  delayDuration={300}>
                                  <TooltipTrigger className='cursor-default ml-1.5'>
                                    <HelpCircle className='h-4 w-4' />
                                  </TooltipTrigger>
                                  <TooltipContent className='w-80 p-2'>
                                    {footnote}
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            ) : (
                              <p
                               >
                                {text}
                              </p>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                    <div className='border-t border-gray-200' />
                    <div className='p-5'>
                      {plan === 'Free' ? (
                        <Link
                          href={
                            user ? '/documents' : '/auth'
                          }
                          className={buttonVariants({
                            className: 'w-full',
                            variant: 'secondary',
                          })}>
                          {user ? 'Get started' : 'Sign up'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      ) : isPro ?    <Link
                      href='/documents'
                      className={buttonVariants({
                        className: 'w-full',
                      })}>
                      {'Get Started'}
                      <ArrowRight className='h-5 w-5 ml-1.5' />
                    </Link> :( user && !isPro) ? (
                        <UpgradeButton />
                      ) : (
                        <Link
                          href='/auth'
                          className={buttonVariants({
                            className: 'w-full',
                          })}>
                          {'Claim your discount'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      )}
                    </div>
                  </div>
                )
              }
            )}
          </TooltipProvider>
        </div>
      </div>
    </>
  )
}

export default Prices
