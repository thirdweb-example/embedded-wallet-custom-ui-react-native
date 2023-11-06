import {
  AddressDisplay,
  BaseButton,
  Box,
  EmbeddedWallet,
  embeddedWallet,
  Text,
  TextInput,
  ThirdwebProvider,
  useAddress,
  useConnectionStatus,
  useDisconnect,
  useEmbeddedWallet,
  useWallet,
} from '@thirdweb-dev/react-native';
import React, {useEffect, useState} from 'react';
import {TW_CLIENT_ID} from '@env';
import {
  ActivityIndicator,
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {GoogleIcon} from './assets/google-icon';
import {EmailIcon} from './assets/email-icon';
import {ThirdwebText} from './assets/thirdweb-text';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'ethereum';

const App = () => {
  return (
    <ThirdwebProvider
      theme="dark"
      activeChain={activeChain}
      clientId={TW_CLIENT_ID}
      supportedWallets={[embeddedWallet()]}>
      <SafeAreaView style={styles.safe}>
        <Home />
      </SafeAreaView>
    </ThirdwebProvider>
  );
};

const Home = () => {
  const address = useAddress();
  const connectedWallet = useWallet();
  const [email, setEmail] = useState<string | undefined>();
  const connectionStatus = useConnectionStatus();
  const disconnect = useDisconnect();

  useEffect(() => {
    if (connectedWallet) {
      setEmail((connectedWallet as EmbeddedWallet)?.getEmail());
    }
  }, [connectedWallet]);

  return (
    <Box flex={1} alignItems="center" padding="md" backgroundColor="background">
      <Box>
        <Text variant="header">Welcome to </Text>
        <BaseButton
          onPress={() => {
            Linking.openURL('https://thirdweb.com');
          }}>
          <ThirdwebText />
        </BaseButton>
      </Box>
      {address ? (
        <>
          <Text variant="bodyLargeBold" mt="xl">
            Connected as {email}
          </Text>
          <Box flexDirection="row" alignItems="center" mt="md">
            <Text variant="bodyLargeBold" mr="sm">
              Your wallet:
            </Text>
            <AddressDisplay variant="bodyLargeBold" address={address} />
          </Box>
          <BaseButton
            mt="xl"
            flexDirection="row"
            onPress={disconnect}
            padding="sm"
            alignItems="center"
            backgroundColor="backgroundHighlight"
            borderRadius="lg">
            <Text variant="bodySmall">Log out</Text>
          </BaseButton>
        </>
      ) : (
        <>
          {connectionStatus === 'disconnected' ? (
            <>
              <CustomLogin />
            </>
          ) : (
            <Box
              height={100}
              width={100}
              alignItems="center"
              justifyContent="center">
              <ActivityIndicator />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

// Handles login with Google
const CustomGoogleSignInButton = () => {
  const {connect} = useEmbeddedWallet();

  const signInWithGoogle = async () => {
    await connect({
      strategy: 'google',
      redirectUrl: 'rnstarter://',
    });
  };

  return (
    <BaseButton
      mt="xl"
      flexDirection="row"
      onPress={signInWithGoogle}
      padding="sm"
      alignItems="center"
      backgroundColor="backgroundHighlight"
      borderRadius="lg">
      <GoogleIcon />
      <Text variant="bodySmall" ml="xxs">
        Sign in with Google
      </Text>
    </BaseButton>
  );
};

// Handles login with email
const CustomLogin = () => {
  const [state, setState] = useState<
    'init' | 'emter_email' | 'sending_email' | 'email_verification'
  >('init');

  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const {connect, sendVerificationEmail} = useEmbeddedWallet();

  const handleEmailClicked = async () => {
    setState('emter_email');
  };

  const handleEmailEntered = async () => {
    if (!email) {
      Alert.alert('Please enter an email');
      return;
    }
    setState('sending_email');
    await sendVerificationEmail({email});
    setState('email_verification');
  };

  const handleEmailVerification = async () => {
    if (!email || !verificationCode) {
      Alert.alert('Please enter an verification code');
      return;
    }
    await connect({strategy: 'email_verification', email, verificationCode});
  };

  if (state === 'emter_email') {
    return (
      <>
        <Text variant="bodySmallBold" mt="xl" mb="xs">
          Enter your email
        </Text>
        <TextInput
          textInputProps={{
            placeholder: 'Email',
            placeholderTextColor: 'white',
            value: email,
            onChangeText: setEmail,
          }}
          containerProps={{
            width: 200,
            paddingLeft: 'xs',
          }}
        />
        <BaseButton
          onPress={handleEmailEntered}
          mt="md"
          flexDirection="row"
          padding="sm"
          alignItems="center"
          backgroundColor="backgroundHighlight"
          borderRadius="lg">
          <Text variant="bodySmall">Continue</Text>
        </BaseButton>
        <BaseButton mt="xl" onPress={() => setState('init')}>
          <Text variant="link">Go Back</Text>
        </BaseButton>
      </>
    );
  }

  if (state === 'sending_email') {
    return (
      <Box height={100} width={100} alignItems="center" justifyContent="center">
        <ActivityIndicator />
      </Box>
    );
  }

  if (state === 'email_verification') {
    return (
      <>
        <Text variant="bodySmallBold" mt="xl" mb="xs">
          Enter the verification code sent to your email
        </Text>
        <TextInput
          textInputProps={{
            placeholder: 'Enter verification code',
            placeholderTextColor: 'white',
            value: verificationCode,
            onChangeText: setVerificationCode,
          }}
          containerProps={{
            width: 200,
            paddingLeft: 'xs',
          }}
        />
        <BaseButton
          onPress={handleEmailVerification}
          mt="md"
          flexDirection="row"
          padding="sm"
          alignItems="center"
          backgroundColor="backgroundHighlight"
          borderRadius="lg">
          <Text variant="bodySmall">Verify</Text>
        </BaseButton>
        <BaseButton mt="xl" onPress={() => setState('init')}>
          <Text variant="link">Go Back</Text>
        </BaseButton>
      </>
    );
  }

  return (
    <>
      <CustomGoogleSignInButton />
      <BaseButton
        mt="md"
        flexDirection="row"
        onPress={handleEmailClicked}
        padding="sm"
        alignItems="center"
        backgroundColor="backgroundHighlight"
        borderRadius="lg">
        <EmailIcon />
        <Text variant="bodySmall" ml="xxs">
          Sign in with Email
        </Text>
      </BaseButton>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: 'black'},
});
