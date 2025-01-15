import React, { useState,useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loginService } from '@/api/authApi';
import { DispatchContext } from '@/Context/ContextAPI';
import { useAppStore } from '@/Context/Zustand';
import { Bars } from 'react-loader-spinner';
import { toast } from 'sonner';
function Login() {
    //  const { input, isAuthenticated,setIsAuthenticated, token,setToken,userEmail,setUserEmail } = useContext(DispatchContext);
       const isAuthenticated = useAppStore((state)=>state.isAuthenticated)
       const setIsAuthenticated  = useAppStore((state)=>state.setIsAuthenticated )
       const setUserEmail = useAppStore((state)=>state.setUserEmail)
       const setToken = useAppStore((state)=>state.setToken)

const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    // useEffect(() => {
    //   // Check localStorage for saved authentication state
    //   const authToken = localStorage.getItem('authToken');
    //   setIsAuthenticated(!!authToken);
    //   isAuthenticated?navigate('/'):navigate('/login')
    // }, []);


   // React Query Mutation for Login
   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await loginService({ email, password });
      console.log('Login successful:', data);
              toast.success('Login successful redirecting to Homepage')                     
           
      setLoading(false);
      localStorage.setItem('authToken', data.access_token);
      setToken(data.access_token) 
      setUserEmail(email)
      localStorage.setItem('usermail', email);
      setIsAuthenticated(true)
      setTimeout(() => {navigate('/');},2000)
      
    } catch (err) {
      setError(err.response?.message || 'Login failed');
   }
  };




  return (
    <>
      <header className='text-3xl absolute inset-8 text-gray-200 container mx-auto font-bold py-2'>MetaMindAI</header>
    <div className="flex items-center justify-center min-h-screen ">
     <Card className="w-full text-teal-900 lg:max-w-xl  max-w-md bg-white/60 backdrop-blur-md shadow-lg cursor-default rounded-lg border border-white/30">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
           Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form  className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button   disabled={loading} onClick={handleLogin} type="submit" className="w-full bg-teal-900">
            {loading ? (
                        <div className="flex items-center">
                          <Bars
                            height="20"
                            width="20"
                            color="#CEE2DC"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          />
                        </div>):"Login"}
            </Button>
          </form>
          <p className="text-center mt-4">
            Don't have an account? {" "}
            <Button
              variant="link"
              onClick={() => navigate('/signup')}
              className="p-0  font-semibold "
            
            >
              Sign Up
            </Button>
          </p>
        </CardContent>
      </Card>
  
    </div>
    </>
  );
}

export default Login ;
