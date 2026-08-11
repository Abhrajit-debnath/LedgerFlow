import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ImageBackground,  useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import {
  useFonts,
  HankenGrotesk_400Regular,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold
} from '@expo-google-fonts/hanken-grotesk';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/src/global.css';
import AuthProvider from '@/src/providers/auth-provider';
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    HankenGrotesk_400Regular,
    HankenGrotesk_600SemiBold,
    HankenGrotesk_700Bold
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (fontsLoaded) {
      timer = setTimeout(() => {
        setAppIsReady(true);
      }, 2000)
    }


    return () => {
      clearTimeout(timer);
    }
  }, [fontsLoaded]);



  if (!appIsReady) {
    return (
      <ImageBackground
        source={require('../../assets/images/splash_bg.png')}
        resizeMode="cover"
        className="flex-1 items-center justify-center w-full h-full"
      >
        <Animated.View entering={SlideInDown}
          exiting={FadeOut}>
          <Image
            source={require('../../assets/images/splash_logo.png')}
            style={{ width: 300, height: 180 }}
            contentFit="contain"
            onLoadEnd={() => {
              SplashScreen.hideAsync();
            }}
          />
        </Animated.View>

        <Animated.Text
          entering={FadeIn}
          exiting={FadeOut}
          className='text-foreground font-bold text-md -m-5 font-hanken'
        >
          Business Expense Manager
        </Animated.Text>
      </ImageBackground>
    );
  }

  return (
    <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <AuthProvider>
        <Slot />
      </AuthProvider>

    </GluestackUIProvider>
  );
}