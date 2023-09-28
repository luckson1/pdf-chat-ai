import CheckList from '@/components/check_lits'
import Faqs from '@/components/faqs'
import Features from '@/components/features'
import Footer from '@/components/footer'
import { Hero } from '@/components/hero'
import Credits from '@/components/prices'


export default function Home() {
  return (
  
<div className='w-full h-fit min-h-screen space-y-10 flex flex-col'>

<Hero />
<Features />
<CheckList />
<Credits />
<Faqs />
<Footer />

</div>)
}
