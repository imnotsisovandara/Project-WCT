import { Button } from "@/components/ui/button"
import { Chrome, Facebook, Github } from 'lucide-react'

export default function SocialLoginButtons() {
  const handleSocialLogin = (provider) => {
    // Placeholder for social login logic
    console.log(`Logging in with ${provider}`)
  }

  return (
    <div className="space-y-2">
      <Button 
        className="w-full bg-red-500 hover:bg-red-600" 
        onClick={() => handleSocialLogin('Google')}
      >
        <Chrome className="mr-2 h-4 w-4" /> Continue with Google
      </Button>
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700" 
        onClick={() => handleSocialLogin('Facebook')}
      >
        <Facebook className="mr-2 h-4 w-4" /> Continue with Facebook
      </Button>
      <Button 
        className="w-full bg-gray-800 hover:bg-gray-900" 
        onClick={() => handleSocialLogin('GitHub')}
      >
        <Github className="mr-2 h-4 w-4" /> Continue with GitHub
      </Button>
    </div>
  )
}

