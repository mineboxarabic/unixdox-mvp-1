
import { useColorModeValue } from '@/src/components/ui/color-mode'
import { 
  Box,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  Icon
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { toaster } from '@/src/components/ui/toaster'
 
const GoogleIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" boxSize="5" {...props}>
    <path fill="#EA4335" d="M12 11.5v2.9h4.35c-.19 1.23-1.4 3.6-4.35 3.6-2.62 0-4.75-2.17-4.75-4.83s2.13-4.83 4.75-4.83c1.49 0 2.49.64 3.06 1.19l2.08-2.01C16.4 6.07 14.42 5 12 5 7.85 5 4.39 7.93 3.43 11.9l2.83 2.2C7.92 11.73 9.8 11.5 12 11.5z" />
  </Icon>
)
 
export default function _SignIn() {
  const rightBg = useColorModeValue('linear-gradient(135deg, #eaf4ff 0%, #fff6ea 100%)', 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)')
 
  // Use Next.js env variable NEXT_PUBLIC_GOOGLE_CLIENT_ID to enable Google Identity Services.
  // If not provided, fallback to the placeholder toast.
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const googleButtonRef = useRef<HTMLDivElement>(null)
 
  // Small JWT decode helper to extract basic profile data from the credential.
  const decodeJwt = (jwt: string) => {
    try {
      const base64Url = jwt.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (e) {
      return null
    }
  }
 
  const handleFallbackClick = () => {
    toaster.create({
      title: 'Flux OAuth non configuré',
      description: "Aucun client Google configuré. Ajoutez NEXT_PUBLIC_GOOGLE_CLIENT_ID pour activer la connexion.",
      type: 'info',
      duration: 6000,
    })
  }
 
  useEffect(() => {
    if (!CLIENT_ID) return
 
    // If Google script already loaded, initialize immediately; otherwise inject script.
    const initGoogle = () => {
      /* global google */
      if ((window as any).google && (window as any).google.accounts && (window as any).google.accounts.id) {
        (window as any).google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (response: any) => {
            const payload = decodeJwt(response.credential)
            const name = payload?.name || payload?.email || 'Utilisateur'
            toaster.create({
              title: 'Connecté',
              description: `Connecté en tant que ${name}`,
              type: 'success',
              duration: 5000,
            })
            console.log('Google credential response:', payload)
          }
        })
 
        // Render Google's button into our container
        if (googleButtonRef.current) {
          (window as any).google.accounts.id.renderButton(googleButtonRef.current, {
            theme: 'outline',
            size: 'large',
            width: '100%'
          })
        }
      }
    }
 
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      initGoogle()
    } else {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = initGoogle
      document.head.appendChild(script)
    }
 
    // Cleanup not strictly necessary for script tag, but remove render if unmounting
    return () => {
      try {
        if ((window as any).google && (window as any).google.accounts && (window as any).google.accounts.id && googleButtonRef.current) {
          // There's no official destroy for renderButton; clearing container is fine.
          googleButtonRef.current.innerHTML = ''
        }
      } catch (e) {
        // ignore
      }
    }
  }, [CLIENT_ID])
 
  return (
    <Flex minH="100vh" direction={{ base: 'column', md: 'row' }}>
      {/* Left */}
      <Flex flex="1" align="center" justify="center">
        <Box maxW="420px" w="full" px={{ base: 6, md: 12 }}>
          <Heading size="lg" mb={3} color="gray.700">Connexion</Heading>
          <Text mb={8} color="gray.500">Retrouvez votre assistant administratif personnel</Text>
 
          {/* If CLIENT_ID is provided, the Google button will be rendered into this div.
              Otherwise we show the fallback custom button which shows an informational toast. */}
          <Box ref={googleButtonRef} />
 
          <Button
            w="full"
            bg="blackAlpha.800"
            color="white"
            _hover={{ bg: 'blackAlpha.900' }}
            borderRadius="full"
            py={6}
            mt={4}
            onClick={() => {
              if (CLIENT_ID) {
                // If Google client id is set but the official button didn't render, guide the user.
                toaster.create({
                  title: 'Utilisez le bouton Google',
                  description: 'Si le bouton Google n\'apparaît pas, rafraîchissez la page ou vérifiez la console pour les erreurs de chargement du script.',
                  type: 'info',
                  duration: 6000,
                })
              } else {
                handleFallbackClick()
              }
            }}
          >
            <HStack gap={3}>
              <GoogleIcon />
              <Text>{CLIENT_ID ? 'Ou utiliser le bouton Google' : 'Connectez-vous avec google'}</Text>
            </HStack>
          </Button>
 
          <Text mt={3} fontSize="sm" color="gray.500">
            {CLIENT_ID ? 'Vous pouvez aussi utiliser le bouton Google ci-dessus.' : 'Pas de flux OAuth implémenté. Je peux ajouter l\'intégration Google si vous le souhaitez.'}
          </Text>
        </Box>
      </Flex>
 
      {/* Right */}
      <Flex
        flex="1"
        align="center"
        justify="center"
        background={rightBg}
        position="relative"
      >
        <Box textAlign="center">
          <Heading size="xl" color="#084C61" letterSpacing="wide">
            UNIDOX
          </Heading>
          <Box h="2px" bg="#28A0C9" w="80px" mx="auto" mt={3} />
        </Box>
      </Flex>
    </Flex>
  )
}