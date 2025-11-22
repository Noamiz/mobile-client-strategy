import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import { useAuth } from '../hooks/useAuth';
import { HistoryScreen } from '../screens/HistoryScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LiveScreen } from '../screens/LiveScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SendCodeScreen } from '../screens/SendCodeScreen';
import { VerifyCodeScreen } from '../screens/VerifyCodeScreen';
import { useTheme } from '../theme';

enableScreens(true);

export type AuthStackParamList = {
  SendCode: undefined;
  VerifyCode: { email?: string } | undefined;
};

export type MainTabsParamList = {
  Home: undefined;
  Live: undefined;
  History: undefined;
  Profile: undefined;
};

type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabsParamList>();

export function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <RootStack.Screen name="MainTabs" component={MainTabsNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SendCode" component={SendCodeScreen} />
      <AuthStack.Screen name="VerifyCode" component={VerifyCodeScreen} />
    </AuthStack.Navigator>
  );
}

function MainTabsNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: theme.spacing.xs,
          paddingTop: theme.spacing.xxs,
          height: 68,
        },
        tabBarIcon: ({ color, focused, size }) => (
          <Ionicons name={getTabIcon(route.name, focused)} color={color} size={size ?? 20} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Live" component={LiveScreen} options={{ title: 'Live' }} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function getTabIcon(routeName: keyof MainTabsParamList, focused: boolean) {
  switch (routeName) {
    case 'Home':
      return focused ? 'home' : 'home-outline';
    case 'Live':
      return focused ? 'pulse' : 'pulse-outline';
    case 'History':
      return focused ? 'time' : 'time-outline';
    case 'Profile':
    default:
      return focused ? 'person' : 'person-outline';
  }
}


