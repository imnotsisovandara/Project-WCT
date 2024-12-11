'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import SocialLoginButtons from './SocialLoginButton'
import PhoneOTPForm from './PhoneOTPForm'
import Link from 'next/link'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [activeTab, setActiveTab] = useState('email')

  const handleRegister = (e) => {
    e.preventDefault()
    console.log('Registering with:', { email, password })
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6">
        <div className="space-x-2 border-b pb-4 mb-4">
          <Button 
            variant={activeTab === 'email' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('email')}
          >
            Email
          </Button>
          <Button 
            variant={activeTab === 'phone' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('phone')}
          >
            Phone
          </Button>
          <Button 
            variant={activeTab === 'social' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('social')}
          >
            Social
          </Button>
        </div>

        {activeTab === 'email' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Register</Button>
          </form>
        )}

        {activeTab === 'phone' && <PhoneOTPForm />}
        {activeTab === 'social' && <SocialLoginButtons />}

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </p>
      </Card>
    </div>
  )
}

