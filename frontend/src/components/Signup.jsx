import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { signupService } from '@/api/authApi';
import { Bars } from 'react-loader-spinner';
import { toast } from 'sonner';

function Signup() {

const [email, setEmail] = useState('')
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const data = await signupService({ email, name, password });
      setLoading(false)
     
        toast.success('Signup successful redirecting to Login')                     
      
      console.log('Signup successful:', data);
      setTimeout(() => {navigate('/login')},2000)
      
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      console.log(err)
    }
  };



  return (
    <>
      <header className='text-3xl absolute inset-8 text-gray-200 container mx-auto font-bold py-2'>MetaMindAI</header>
    <div className="flex items-center justify-center min-h-screen ">
     
   <Card className="w-full max-w-md text-teal-900 lg:max-w-xl bg-white/60 backdrop-blur-md shadow-lg cursor-default rounded-lg border border-white/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
           Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form  className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
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
            <Button disabled={loading} onClick={handleSignup} type="submit" className="w-full bg-teal-900">
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
                                 </div>):"Sign Up"}
            </Button>
          </form>
          <p className="text-center mt-4">
            Already have an account? {" "}
            <Button
              variant="link"
              onClick={() => navigate('/login')}
              className="p-0 font-semibold"
            >
             Login
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
    </>
  );
}

export default Signup;

