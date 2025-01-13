import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useForgotPassword } from '../../store/otpauth'; // Import the context
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { baseUrl } from '@/urls';

const OtpVerificationPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { getTempTokenFromLS } = useForgotPassword();

    const handleOtpChange = (e) => setOtp(e.target.value);

    const verifyOtp = async () => {
        const tempToken = getTempTokenFromLS();
        if (!tempToken) {
            setError('No temporary token found. Please request OTP again.');
            return;
        }

        try {
            const response = await axios.post(
                `${baseUrl}/api/pass_reset/verify-otp`,
                { otp },
                {
                    headers: {
                        Authorization: `Bearer ${tempToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.message === 'OTP verified successfully') {
                navigate('/new-password-page');
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again later.';
            console.error('Request Error:', errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Verify OTP sent to your email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="otp">Enter the OTP</Label>
                        <Input id="otp" type="text" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="button" className="w-full" onClick={verifyOtp}>
                        Verify OTP
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OtpVerificationPage;
