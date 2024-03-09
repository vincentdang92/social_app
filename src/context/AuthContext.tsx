import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
    accountId: '',
    name: '',
    username: '',
    email: '',
    bio: '',
    

};
const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    Authenticated: false,
    setUser: () => {},
    setAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,

};
const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setisLoading] = useState(false);
    const [Authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const checkAuthUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            if(currentUser){
                setUser({
                    accountId: currentUser.$id,
                    name: currentUser.name,
                    username: currentUser.username,
                    email: currentUser.emmail,
                    imageUrl: currentUser.imageUrl,
                    bio: currentUser.bio
                });
                setAuthenticated(true);
                return true;
            }
            
            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally{
            setisLoading(false);
        }
    };
    //run whenever app loads with []
    useEffect(() => {
      if(
        localStorage.getItem("cookieFallback") === '[]' ||
        localStorage.getItem("cookieFallback") === null
      ){
        navigate('/sign-in');
      }
        
      
    }, []);
    
    const value = {
        user,
    setUser,
    isLoading,
    Authenticated,
    setAuthenticated,
    checkAuthUser,
    };

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export const useUserContext = () => useContext(AuthContext);