import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignoutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'

const Topbar = () => {
    const { user, checkAuthUser  } = useUserContext();
    useEffect(() => {
        checkAuthUser(); // This should trigger the checkAuthUser function
    }, []);
    
    const navigate = useNavigate();
    const {mutate: signOut, isSuccess} = useSignoutAccount();
    useEffect(()=>{
        if(isSuccess) navigate(0);

    },[isSuccess]);
  return (
    <section className="topbar">
        <div className="flex-between py-4 px-5"> 
            <Link className="flex gap-3 items-center" to="/">
                <img 
                    src="/assets/images/logo.svg"
                    alt='logo'
                    width={130}
                    height={325}
                />
            </Link>
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="shad-btn" onClick={() => signOut()}>
                    <img 
                        src="/assets/icons/logout.svg"
                    />
                </Button>
                <Link to={`/profile/${user.accountId}`} className="flex text-center gap-3">
                    <img
                        src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
                        alt={user.name || ''}
                        className='h-8 w-8 rounded-full'
                    />
                </Link>
            </div>

        </div>
    </section>
  )
}

export default Topbar