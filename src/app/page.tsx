import CheckList from '@/components/check_list'
import Faqs from '@/components/faqs'
import Features from '@/components/features'
import Footer from '@/components/footer'
import { Hero } from '@/components/hero'
import Credits from '@/components/prices'
import UseCases from '@/components/use_cases'


export default function Home() {
  return (
  
<div className='w-full h-fit min-h-screen space-y-10 flex flex-col'>
<div className='h-auto w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-primary/0 to-primary/10'>
<div className='w-full px-5 py-10 h-auto spacec-y-10 flex flex-col container'>
<Hero />
<Features />
</div>
</div>

<div className='w-full px-5 py-10 h-auto spacec-y-10 flex container flex-col'>
<CheckList />
<UseCases />
<Credits />
<Faqs />
<Footer />
</div>

</div>)
}
