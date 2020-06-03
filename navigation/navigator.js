import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/** Screens */
import JobDetail from "../screens/homeStacks/jobDetail";
import Search from "../screens/searchStacks/search";
import Login from "../screens/profileStacks/login";
import Register from "../screens/profileStacks/register";
import ChangePassword from "../screens/profileStacks/changePassword";
import Home from "../screens/homeStacks/home";
import Profile from "../screens/profileStacks/profile";
/** utils */
import { DefaultThemeColors, DarkThemeColors } from "../utils/constants/Colors";
/** shared components */
import TabBarIcon from "../shared/tabBarIcon";
import Header from "../shared/header";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import BasicInfo from "../screens/profileStacks/basicInfo";
import Resume from "../screens/profileStacks/resume";
import JobsApplied from "../screens/profileStacks/jobsApplied";

//initial route name upon app load
const INITIAL_ROUTE_NAME = "HomeTabs";

function Navigator() {
  //fetch theme context value
  const { theme } = useContext(ThemeContext);
  //fetch authenticated user context value
  const { authUser } = useContext(AuthContext);

  //user login status
  const isUserLoggedIn = authUser.token ? true : false;

  //theme status
  const isThemeDark = theme === "dark" ? true : false;

  //colors object
  const Colors = isThemeDark ? DarkThemeColors : DefaultThemeColors;

  //cutomizing stack header
  const customStackHeaderStyle = {
    headerStyle: {
      backgroundColor: Colors.headerBg,
      height: 60,
    },
    headerTintColor: Colors.headerTint,
  };

  //cutomizing bottom tab-bar
  const customTabBarStyle = {
    activeTintColor: Colors.tabIconSelected,
    inactiveTintColor: Colors.tabIconDefault,
    allowFontScaling: true,
    labelStyle: { fontSize: 12, paddingTop: 2 },
    tabStyle: { paddingTop: 10, paddingBottom: 5 },
    style: {
      backgroundColor: Colors.tabBg,
      height: 60,
      borderTopColor: DefaultThemeColors.tabBarBorderDefault,
    },
  };

  const Tabs = createBottomTabNavigator();
  const Stack = createStackNavigator();

  //home stack contains home and job detail screen
  const HomeStacks = function () {
    return (
      <Stack.Navigator screenOptions={customStackHeaderStyle}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => <Header />,
          }}
        />
        <Stack.Screen name="JobDetail" component={JobDetail} />
      </Stack.Navigator>
    );
  };

  //search stack contains serach only
  const SearchStacks = function () {
    return (
      <Stack.Navigator
        screenOptions={{
          ...customStackHeaderStyle,
          headerTitle: () => <Header />,
        }}
      >
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    );
  };

  //profile stack contains profile, change display picture, edit profile and change password screen
  const ProfileStacks = function () {
    return (
      <Stack.Navigator
        initialRouteName={Profile}
        screenOptions={customStackHeaderStyle}
      >
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: () => <Header />,
          }}
        />
        {/* check if user is logged in */}
        {isUserLoggedIn ? (
          <>
            <Stack.Screen
              name="BasicInfo"
              component={BasicInfo}
              options={{
                title: "Basic Info",
              }}
            />
            <Stack.Screen
              name="Resume"
              component={Resume}
              options={{
                title: "Resume",
              }}
            />
            <Stack.Screen
              name="JobsApplied"
              component={JobsApplied}
              options={{
                title: "Jobs Applied",
              }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{
                title: "Change Password",
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    );
  };

  return (
    <Tabs.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={customTabBarStyle}
    >
      <Tabs.Screen
        name="HomeTab"
        children={HomeStacks}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon color={color} size={size} name="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="SearchTab"
        children={SearchStacks}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon color={color} size={size} name="search" />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileTab"
        children={ProfileStacks}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon color={color} size={size} name="person-outline" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default Navigator;
