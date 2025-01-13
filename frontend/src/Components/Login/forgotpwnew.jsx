'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/Components/ui/card'
import { Label } from '@/Components/ui/label'
import { Alert, AlertDescription } from '@/Components/ui/alert'
import { baseUrl } from '@/urls'

export default function ChangePasswordPage() {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlepasswordChange = (e) => setpassword(e.target.value)
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

  const changePassword = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setError('')

    try {
      const response = await axios.post(`${baseUrl}/api/pass_reset/reset-password`, { email, password })
      const data = response.data;

      if (data.message == 'Password reset successful') {
        alert('Password Change Successful!')
        navigate('/')
      } else {
        setError('Failed to change password. Please try again.')
      }
    } catch (error) {
      setError('An error occurred. Please try again later.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Change Password</CardTitle>
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
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={handlepasswordChange}
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
  )
}
