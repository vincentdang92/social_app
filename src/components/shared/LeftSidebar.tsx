/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignoutAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

const LeftSidebar = () => {
	const {pathname} = useLocation();
	const { user  } = useUserContext();
    useEffect(() => {
        //checkAuthUser(); // This should trigger the checkAuthUser function
    }, []);
    
    const navigate = useNavigate();
    const {mutate: signOut, isSuccess} = useSignoutAccount();
    useEffect(()=>{
        if(isSuccess) navigate(0);

    },[isSuccess]);
  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
	  		<Link className="flex gap-3 items-center" to="/">
                <img 
                    src="/assets/images/logo.svg"
                    alt='logo'
                    width={130}
                    height={325}
                />
            </Link>
			<Link to={`/profile/${user.accountId}`} className="flex text-center gap-3">
				<img
					src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
					alt={user.name || ''}
					className='h-8 w-8 rounded-full'
				/>
				<div className=' flex flex-col'>
					<p className='body-bold'>
						{user.name}
					</p>
					<p className='small-regular text-light-3'>
						@{user.username}
					</p>
				</div>
			</Link>
			<ul className='flex flex-col gap-6'>
				{sidebarLinks.map((link:INavLink) => {
					const isActive = pathname === link.route;
					return (
						<li key={link.label} className={`leftsidebar-link group
							${isActive && 'bg-primary-500'}
						`}>
							<NavLink to={link.route} className='flex gap-4 items-center p-4'>
								<img
									src={link.imgURL}
									alt={link.label}
									className={`group-hover:invert-whitetext
										${isActive && 'invert-white'}
									`}
								/>
								{link.label}
							</NavLink>
						</li>
					)
				})}
			</ul>
			<div className='flex items-center'>
				<Button variant="ghost" className="shad-btn" onClick={() => signOut()}>
					<img 
						src="/assets/icons/logout.svg"
					/>
				</Button>
				<span>Logout</span>
			</div>
      </div>
    </nav>
  )
}

export default LeftSidebar