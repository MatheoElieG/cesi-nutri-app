import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import React from "react";
import { InputStyle } from "../../styles/input";
import { StyledButton } from "../../components/StyledButton";
import { ScreenStyle } from "../../styles/screen";
import { ClerkAPIError } from "@clerk/types";

export default function Page() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [isLoading, setIsLoading] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<ClerkAPIError[]>();

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    setErrors(undefined);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
        setIsLoading(false);
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
        setIsLoading(false);
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      setIsLoading(false);
    }
  }, [isLoaded, emailAddress, password, isLoading]);

  return (
    <View style={[ScreenStyle.screen, { gap: 16 }]}>
      <View>
        <Text style={InputStyle.label}>Email</Text>
        <View style={InputStyle.inputContainer}>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            style={InputStyle.input}
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </View>
      </View>
      <View>
        <Text style={InputStyle.label}>Mot de passe</Text>
        <View style={InputStyle.inputContainer}>
          <TextInput
            value={password}
            placeholder="Enter password"
            secureTextEntry={true}
            style={InputStyle.input}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
      </View>
      <StyledButton
        title={"Connexion"}
        style={styles.signInButton}
        onPress={onSignInPress}
        loading={isLoading}
      />
      {errors && errors.length > 0 && (
        <View>
          <Text style={{ color: "red" }}>{errors[0].message}</Text>
        </View>
      )}
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Text>Pas encore inscrit ?</Text>
        <Link href="/sign-up">
          <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: "#007AFF",
  },
});
