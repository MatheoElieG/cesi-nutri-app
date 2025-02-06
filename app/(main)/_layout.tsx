import { Link, Redirect, Stack } from "expo-router";
import { AddFoodProvider } from "../../providers/add-food-provider";
import { MealProvider } from "../../providers/meal-provider";
import { useAuth } from "@clerk/clerk-expo";
import { SignOutButton } from "../../components/SignOutButton";
import { Button } from "react-native";

const Layout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <MealProvider>
      <AddFoodProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Liste de vos repas",
              headerRight: () => (
                <Link href="/profile" asChild>
                  <Button title={"Profil"} />
                </Link>
              ),
            }}
          />

          <Stack.Screen
            name="profile"
            options={{
              title: "Profil",
              headerRight: () => <SignOutButton />,
            }}
          />

          <Stack.Screen
            name="add"
            options={{
              title: "Ajouter un repas",
              headerBackTitle: "Retour",
            }}
          />

          <Stack.Screen
            name="camera"
            options={{
              title: "Scanner un code barre",
              headerBackTitle: "Retour",
            }}
          />

          <Stack.Screen
            name="meal/[id]"
            options={{
              title: "Détail d'un repas",
              headerBackTitle: "Retour",
            }}
          />
        </Stack>
      </AddFoodProvider>
    </MealProvider>
  );
};

export default Layout;
