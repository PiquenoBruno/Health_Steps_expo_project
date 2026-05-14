import colors from "@/src/constants/colors";
import { useAuth } from "@/src/hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Alert, Image, StyleSheet, Text, View } from "react-native";

function CustomDrawer(props: any) {
  const { user, logout } = useAuth();

  // rota ativa
  const activeRoute = props.state.routeNames[props.state.index];

  const handleLogout = () => {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: logout },
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://ui-avatars.com/api/?name=" + user?.email }}
            style={styles.avatar}
          />
          <Text style={styles.userText}> {user?.email}</Text>
        </View>
      </View>

      {/* MENU */}
      <View style={styles.menu}>
        <DrawerItem
          label="Contador"
          icon={({ color, size }) => (
            <MaterialIcons name="calculate" size={size} color={color} />
          )}
          labelStyle={[
            styles.label,
            activeRoute === "index" && styles.activeLabel,
          ]}
          style={activeRoute === "index" && styles.activeItem}
          onPress={() => props.navigation.navigate("index")}
        />

        <DrawerItem
          label="Perfil"
          icon={({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          )}
          labelStyle={[
            styles.label,
            activeRoute === "profile" && styles.activeLabel,
          ]}
          style={activeRoute === "profile" && styles.activeItem}
          onPress={() => props.navigation.navigate("profile")}
        />

        <DrawerItem
          label="Histórico"
          icon={({ color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          )}
          labelStyle={[
            styles.label,
            activeRoute === "history" && styles.activeLabel,
          ]}
          style={activeRoute === "history" && styles.activeItem}
          onPress={() => props.navigation.navigate("history")}
        />
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={colors.colorAlert} />
          )}
          labelStyle={styles.logout}
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.color1 },
        headerTintColor: colors.textcolor1,
        headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
        drawerStyle: { backgroundColor: colors.background, width: 260 },
        drawerActiveTintColor: colors.color1,
        drawerInactiveTintColor: "#555",
        drawerActiveBackgroundColor: colors.color4,
        drawerLabelStyle: { fontSize: 16, fontWeight: "600" },
        headerRight: () => (
          <Text style={{
            marginRight: 15,
            fontSize: 22,
            fontWeight: "bold",
            color: colors.textcolor1
          }}>
            HealthSteps :)
          </Text>
        ),
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Contador" }} />
      <Drawer.Screen name="history" options={{ title: "Histórico" }} />
      <Drawer.Screen name="profile" options={{ title: "Perfil" }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    padding: 20,
    backgroundColor: colors.color1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  avatarContainer: { flexDirection: "row", alignItems: "center" },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#fff",
  },

  userText: {
    color: colors.textcolor1,
    fontSize: 14,
    fontWeight: "600",
  },

  menu: { marginTop: 20 },

  label: { fontSize: 16, color: colors.color1 },

  activeLabel: { color: colors.colorDestaque, fontWeight: "bold" },

  activeItem: {
    backgroundColor: colors.color4,
    borderRadius: 8,
  },

  footer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: colors.color3,
    paddingTop: 10,
  },

  logout: { color: colors.colorAlert, fontWeight: "bold" },
});
