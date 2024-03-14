import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import {Link, NavLink, useLocation} from 'react-router-dom';

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className='bottom-bar w-full'>
      <ul className='flex gap-2 justify-between w-full'>
				{sidebarLinks.map((link:INavLink) => {
					const isActive = pathname === link.route;
					return (
						<li key={link.label} className={`leftsidebar-link group
							${isActive && 'bg-primary-500 rounded-[10px]'}
						`}>
							<NavLink to={link.route} className='flex  items-center p-2 flex-col gap-1 rounded-[10px] transition'>
								<img
									src={link.imgURL}
									alt={link.label}
									className={`group-hover:invert-whitetext
										${isActive && 'invert-white '}
									`}
								/>
								<p className='tiny-large text-light-2'>{link.label}</p>
							</NavLink>
						</li>
					)
				})}
			</ul>
    </section>
  )
}

export default Bottombar