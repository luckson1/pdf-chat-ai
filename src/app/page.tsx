import CheckList from '@/components/check_lits'
import Faqs from '@/components/faqs'
import Features from '@/components/features'
import Footer from '@/components/footer'
import { Hero } from '@/components/hero'
import Credits from '@/components/prices'


export default function Home() {
  return (
  
<div className='w-full h-fit min-h-screen space-y-10 flex flex-col'>
<div className='h-auto w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-primary/0 to-primary/20'>
<div className='w-full px-5 py-10 h-auto spacec-y-10 flex flex-col container'>
<Hero />
<Features />
</div>
</div>

<div className='w-full px-5 py-10 h-auto spacec-y-10 flex container flex-col'>
<CheckList />
<Credits />
<Faqs />
<Footer />
</div>

</div>)
}
