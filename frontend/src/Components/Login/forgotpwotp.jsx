import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Input} from '@/Components/ui/input';
import { Button, buttonVariants } from '@/Components/ui/button';
import {Card, CardHeader, CardContent, CardTitle, CardFooter} from '@/Components/ui/card';
import { Label } from '@/Components/ui/label'

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleOtpChange = (e) => setOtp(e.target.value);

  const verifyOtp = async () => {

    setIsLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:5090/api/pass_reset/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (data.success) {
        navigate('/new-password-page'); 
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false)
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
            <Label htmlFor="new-password">Enter the OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter otp"
              value={otp}
              onChange={handleOtpChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={verifyOtp} 
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OtpVerificationPage;
