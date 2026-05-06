import colors from "@/src/constants/colors";
import { useAuth } from "@/src/hooks/useAuth";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, Text, View } from "react-native";

function CustomDrawer(props: any) {
  const { user, logout } = useAuth();

  //rota ativa
  const activeRoute = props.state.routeNames[props.state.index];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.userText}>
          👤 {user?.email}
        </Text>
      </View>

      {/* MENU */}
      <View style={styles.menu}>
        <DrawerItem
          label="Contador"
          labelStyle={[
            styles.label,
            activeRoute === "index" && styles.activeLabel, // aplica cor se ativo
          ]}
          onPress={() => props.navigation.navigate("index")}
        />

        <DrawerItem
          label="Perfil"
          labelStyle={[
            styles.label,
            activeRoute === "profile" && styles.activeLabel,
          ]}
          onPress={() => props.navigation.navigate("profile")}
        />

        <DrawerItem
          label="Histórico"
          labelStyle={[
            styles.label,
            activeRoute === "history" && styles.activeLabel,
          ]}
          onPress={() => props.navigation.navigate("history")}
        />
      </View>




      {/* FOOTER */}
      <View style={styles.footer}>
        <DrawerItem
          label="Logout"
          labelStyle={styles.logout}
          onPress={logout}
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
        
        headerStyle: {
          backgroundColor: colors.color1,
        },
        headerTintColor: colors.textcolor1,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },        

        drawerStyle: {
          backgroundColor: colors.background,
          width: 260,
        },

        drawerActiveTintColor: colors.color1,
        drawerInactiveTintColor: "#555",
        drawerActiveBackgroundColor: colors.color4,

        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
        },
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
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    padding: 20,
    backgroundColor: colors.color1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  userText: {
    color: colors.textcolor1,
    fontSize: 14,
    fontWeight: "600",
  },

  menu: { 
    marginTop: 20,
  },

  label: {
    fontSize: 16,
    color: colors.color1,
  },

  activeLabel: {
  color: colors.colorDestaque, 
  fontWeight: "bold",
  },


  footer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: colors.color3,
    paddingTop: 10,
  },

  logout: {
    color: colors.colorAlert,
    fontWeight: "bold",
  },
});