'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PhoneOTPForm() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('phone') // 'phone' or 'otp'

  const handleSendOTP = (e) => {
    e.preventDefault()
    // Placeholder for sending OTP logic
    console.log(`Sending OTP to ${phoneNumber}`)
    setStep('otp')
  }

  const handleVerifyOTP = (e) => {
    e.preventDefault()
    // Placeholder for verifying OTP logic
    console.log(`Verifying OTP: ${otp}`)
  }

  return (
    <form onSubmit={step === 'phone' ? handleSendOTP : handleVerifyOTP} className="space-y-4">
      {step === 'phone' ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Send OTP</Button>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter the OTP sent to your phone"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Verify OTP</Button>
        </>
      )}
    </form>
  )
}

