import * as React from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { InputStyle } from "../../styles/input";
import { StyledButton } from "../../components/StyledButton";
import { ScreenStyle } from "../../styles/screen";
import { ClerkAPIError } from "@clerk/types";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [errors, setErrors] = React.useState<ClerkAPIError[]>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    setErrors(undefined);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
      setIsLoading(false);
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    setErrors(undefined);

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
        setIsLoading(false);
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setIsLoading(false);
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View style={[ScreenStyle.screen, { gap: 16 }]}>
        <View>
          <Text style={InputStyle.label}>Vérifiez votre adresse email</Text>
          <View style={InputStyle.inputContainer}>
            <TextInput
              value={code}
              placeholder="Entrez le code de vérification"
              style={InputStyle.input}
              onChangeText={(code) => setCode(code)}
            />
          </View>
        </View>
        <StyledButton
          title="Vérifier"
          onPress={onVerifyPress}
          style={styles.signUpButton}
          loading={isLoading}
        />
        {errors && errors.length > 0 && (
          <View>
            <Text style={{ color: "red" }}>{errors[0].message}</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={[ScreenStyle.screen, { gap: 16 }]}>
      <View>
        <Text style={InputStyle.label}>Email</Text>
        <View style={InputStyle.inputContainer}>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Entrez votre email"
            style={InputStyle.input}
            onChangeText={(email) => setEmailAddress(email)}
          />
        </View>
      </View>
      <View>
        <Text style={InputStyle.label}>Mot de passe</Text>
        <View style={InputStyle.inputContainer}>
          <TextInput
            value={password}
            placeholder="Mot de passe"
            secureTextEntry={true}
            style={InputStyle.input}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
      </View>
      <StyledButton
        title="S'inscrire"
        onPress={onSignUpPress}
        style={styles.signUpButton}
        loading={isLoading}
      />
      {errors && errors.length > 0 && (
        <View>
          <Text style={{ color: "red" }}>{errors[0].message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  signUpButton: {
    backgroundColor: "#007AFF",
  },
});
