// import { createContext, useState, useContext } from 'react';

// // Define the shape of the Auth context
// interface AuthContextType {
//     genreName: string | null;
//     setGenreName: (token: string | null) => void;
// }

// // Create the Auth context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Create the AuthProvider component
// export const AuthProvider = ({ children }: { children: any }) => {
//     const [token, setToken] = useState<string | null>(null);
//     return (
        
//         <AuthContext.Provider value={{ token, setToken }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the Auth context
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// export default AuthContext;