import { useSSO } from '@clerk/expo';
import { useState } from 'react';
import { Alert } from 'react-native';

export default function () {
  const { startSSOFlow } = useSSO();
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);

  async function handleSocialAuth(
    strategy: 'oauth_google' | 'oauth_apple' | 'oauth_github',
  ) {
    if (loadingStrategy) {
      return;
    }

    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (!createdSessionId || !setActive) {
        Alert.alert(
          'Sign-in incomplete',
          'Sign-in did not complete, please try again.',
        );
        return;
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log('Error in social auth:', error);
      Alert.alert('Error', 'Failed in sign-in, please try again.');
    } finally {
      setLoadingStrategy(null);
    }
  }

  return { handleSocialAuth, loadingStrategy };
}
