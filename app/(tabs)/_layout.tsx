import { Image, Text, View } from "react-native";
import { Tabs, Redirect } from "expo-router";

import { icons } from "../../shared/constants";

interface ITabCoinsProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}
const TabICon = (parmas: ITabCoinsProps) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={parmas.icon}
        resizeMode="contain"
        tintColor={parmas.color}
        className="w-6 h-6"
      ></Image>
      <Text
        className={`text-xs ${
          parmas.focused ? "font-psemibold" : "font-pregular"
        }`}
        style={{ color: parmas.color }}
      >
        {parmas.name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabICon
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                ></TabICon>
              );
            },
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabICon
                  icon={icons.plus}
                  color={color}
                  name="Create"
                  focused={focused}
                ></TabICon>
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return (
                <TabICon
                  icon={icons.profile}
                  color={color}
                  name="Profile"
                  focused={focused}
                ></TabICon>
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
