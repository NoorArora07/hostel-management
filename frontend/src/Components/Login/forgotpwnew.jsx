'use client';

import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { baseUrl } from '@/urls';

const ChangePasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const changePassword = async () => {
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const tempToken = localStorage.getItem('tempToken');
        if (!tempToken) {
            setError('No temporary token found. Please request OTP again.');
            return;
        }

        try {
            const response = await axios.post(`${baseUrl}/api/pass_reset/reset-password`, { password: newPassword }, {
                headers: {
                    'Authorization': `Bearer ${tempToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                alert("Password changed successfully!");
                navigate('/login');
            } else {
                setError('Failed to change password. Please try again.');
            }
        } catch (error) {
            console.error('Request Error:', error.response?.data || error.message);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="newpassword">New Password</Label>
                        <Input
                            id="newpassword"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={changePassword}>
                        Change Password
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ChangePasswordPage;
