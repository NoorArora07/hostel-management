import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { baseUrl } from '@/urls';
import { postToBackend } from '@/store/fetchdata';

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOtpChange = (e) => setOtp(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const verifyOtp = async () => {
    try {
      const response = await postToBackend(`${baseUrl}/api/pass_reset/verify-otp`, { email, otp });
      const data = response.data;
      console.log("response mil gaya: ", response)

      if (data.success) {
        navigate('/new-password-page');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.log("couldnt sent the otp")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Verify OTP sent on your email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp">Enter the OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={verifyOtp}>
            Verify
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OtpVerificationPage;
