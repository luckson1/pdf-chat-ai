import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallback, useEffect, useState } from "react"
import { Database } from "../types/supabase"

const useGetSession= ()=> {
    const [session, setSession]=useState<Session | null>(null)
    const [isSessionLoading, setIsSessionLoading]=useState(false)
    const [name, setName] = useState<string | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const [isPro, setIsPro] = useState<boolean | null>(null)
    const supabase = createClientComponentClient<Database>()

    const fetchSession=useCallback(async()=> {
       try {
        const {
            data: { session },
          } = await supabase.auth.getSession()
          const user = session?.user
          if(!user)   return
          let { data, error, status } = await supabase
          .from('Profile')
          .select('*')
          .eq('id', user.id)
          .single()
  
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          setName(data.name)
    
          setImage(data.image)
          setIsPro(data.isPro)
        }


         setSession(session)

       } catch (error) {
        
       }
       }, [supabase])
    useEffect(()=> {
        setIsSessionLoading(true)
        fetchSession()
        setIsSessionLoading(false)
    }, [fetchSession])
return {isSessionLoading, session, name, image, isPro}

}
export default useGetSession