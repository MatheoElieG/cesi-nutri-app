import { useClerk } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { ScreenStyle } from "../../styles/screen";

const ProfileScreen = () => {
  const { user } = useClerk();

  if (!user) {
    return null;
  }

  return (
    <View style={ScreenStyle.screen}>
      <Text>Email: {user.primaryEmailAddress?.emailAddress}</Text>
    </View>
  );
};

export default ProfileScreen;
