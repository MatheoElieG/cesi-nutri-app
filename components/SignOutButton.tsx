import { Button } from "react-native";
import { useClerk, useSignIn } from "@clerk/clerk-expo";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <Button
      color="red"
      title={"Deconnexion"}
      onPress={() => {
        void signOut();
      }}
    />
  );
};
