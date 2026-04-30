import { useAuth } from "@/src/hooks/useAuth";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Text } from "react-native";

function CustomDrawer(props: any) {
  const { user, logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <Text style={{ margin: 20 }}>
        👤 {user?.email}
      </Text>

      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("index")}
      />

      <DrawerItem
        label="Histórico"
        onPress={() => props.navigation.navigate("history")}
      />

      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="history" options={{ title: "Histórico" }} />
    </Drawer>
  );
}