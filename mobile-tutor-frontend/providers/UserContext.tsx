import { createContext, useState } from 'react';

export const UserContext = createContext<any>(null);
interface Props {
    children: any;
    defaultLocale: string;
};

export const UserContextProvider = ({ children, defaultLocale }: Props) => {
   const [userInfo, setUserInfo] = useState(null);
   const [isAuth, setIsAuth] = useState(false);
   const [locale, setLocale] = useState(defaultLocale);
   const [repetitionModel,setRepetitionModel] = useState(null);
    const [resource, setResource] = useState('');
    const [book, setBook] = useState('');
    const [chapter, setChapter] = useState('');
   const login = (name:string, pass: string) => {
       fetch("/api/login", {
           method: "POST",
           body: JSON.stringify({name:name, pass: btoa(pass)}),
       }).then(() => {
           setIsAuth(true);
           // setUserInfo(res.user)
       });
   };
   
   const logout = () => {
      fetch('/api/logout').then(() => {
           setIsAuth(false);
           setUserInfo(null);
       });
   };

    const value = {
        book,
        setBook,
        chapter,
        setChapter,
        resource,
        setResource,
       userInfo,
       setUserInfo,
       isAuth,
       setIsAuth,
       login,
       logout,
       locale,
       setLocale,
       repetitionModel,
       setRepetitionModel, 
   };

   return (
     <UserContext.Provider value={value}> {children} </UserContext.Provider> 
   );
};


export default UserContext;
