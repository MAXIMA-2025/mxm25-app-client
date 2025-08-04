import Navbar from '@/components/main/Navbar'
import React, {useEffect} from 'react'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router'
import useAuth from '@/hooks/useAuth'
import useAuthContext from '@/hooks/useAuthContext'
import { toast } from 'sonner'

const _layout = () => {
    const auth = useAuth();
  const nav = useNavigate();
  const { isLoggedOut } = useAuthContext();

  useEffect(() => {
    console.log(isLoggedOut)
    if (isLoggedOut) {
      toast.error("Silahkan login terlebih dahulu");
      nav("/login");
    }
    // if (auth.user && !auth.user?.isVerified) {
    //   toast.error(
    //     "Silahkan tunggu verifikasi akun Anda dari panitia MAXIMA 2025"
    //   );
    //   nav("/login/mahasiswa");
    // }
  }, [nav, isLoggedOut, auth]);
  return (
    <div className='flex flex-col items-center'>
        <Outlet/>
        <Navbar/>
    </div>
  )
}

export default _layout