import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailsScreen from '../screens/RestaurantDetailsScreen';
import DishDetailsScreen from '../screens/DishDetailsScreen';
import BasketScreen from '../screens/BasketScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookingScreen from '../screens/BookigScreen';
import ItalianHome from '../screens/ItalianHome';

const Stack = createNativeStackNavigator();

const Navigation = () => {
return (
    <Stack.Navigator 
        initialRouteName='Login' 
        // screenOptions={{ 
        //     headerShown: 'false',
        // }}
    >
          <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen 
            name="Home" 
            component={TabNavigation}
            options={{
                headerShown: false
            }}
        />

        <Stack.Screen 
            name="Delivery" 
            component={TabNavigation}
            options={{
                headerShown: false
            }}
        />
        
        <Stack.Screen 
            name="Dish" 
            component={DishDetailsScreen} 
        />
        <Stack.Screen 
            name="Basket" 
            component={BasketScreen} 
        />
        <Stack.Screen 
            name="Orders" 
            component={OrdersScreen} 
        />
        <Stack.Screen 
            name="OrderDetails" 
            component={OrderDetailsScreen} 
        />
    </Stack.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator 
            barStyle={{
                backgroundColor: '#FFFFFF',
            }}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={24} />
                    ),
                }}
            />
           
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="clipboard-list" color={color} size={24} />
                    ),
                }}
            />
             <Tab.Screen
                name="AI"
                component={BookingScreen}
                options={{
                    // tabBarLabel: 'AI',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="microphone" color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name="Basket"
                component={BasketScreen}
                options={{
                    tabBarLabel: 'Basket',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="basket" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen 
                name="Início" 
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
              <HomeStack.Screen 
                name="italian" 
                component={ItalianHome}
                options={{
                    headerShown: false
                }}
            />
            <HomeStack.Screen 
                name="Restaurant"
                component={RestaurantDetailsScreen}
                options={{
                    headerShown: false
                }}
            />
        </HomeStack.Navigator>
    );
}

export default Navigation;