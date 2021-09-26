import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { hp, wp } from '../Utils';
import Calendar from '../screens/Calendar';
import { NavigationContainer } from "@react-navigation/native";
import Icon from '../components/Icon';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MyTabBar = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    return (
        <View style={{
            position: "absolute",
            bottom: hp(0),
            backgroundColor: "white",
            width: "100%",
            alignSelf: "center",
            padding: wp(3),
            justifyContent: "center",
            display: "flex",
        }}>
            <View style={{ flex: 1, flexDirection: "row" }}>

                {
                    state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const { tabBarIcon } = options
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;
                        const currentIndex = state.index;
                        const activeTintColor = 'blue'
                        const inactiveTintColor = 'black'
                        const color = currentIndex === index ? activeTintColor : inactiveTintColor;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{ flex: 1 }}
                                key={index}
                            >
                                <View style={{ alignSelf: "center" }}>
                                    {tabBarIcon({ focused: currentIndex === index, color: color, size: hp(3.5) })}
                                </View>

                                <Text style={{ alignSelf: "center", color: isFocused ? 'blue' : 'black' }}>
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        );
                    }
                    )}
            </View>
        </View>

    );
}

const CalendarStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Calendar"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Calendar"
                component={Calendar}
                options={{ headerShown: true }}
            />

        </Stack.Navigator>
    )
}

const AboutScreen = () => {
    const [list, setList] = useState([
        'Shows list of days of current month.',
        'User can switch via months, years or go to a particular date.',
        'A custom methods to retrieve a week by a given date.'
    ])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-start", paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Calendar App</Text>
                <Text style={{ fontSize: 18 }}>Features</Text>
                {list.map((data, index) => (
                    <View style={{ flexDirection: 'row' }} key={index}>
                        <Text style={{ fontWeight: "bold",fontSize: 18 }}>{'\u2022'}</Text>
                        <Text style={{ flex: 1, paddingLeft: 5, fontSize: 18 }}>{data}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const AboutStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="About"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="About"
                component={AboutScreen}
                options={{ headerShown: true }}
            />

        </Stack.Navigator>
    )
}

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                showLabel: true
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';
                    if (route.name === 'CalendarStack') {
                        return <Icon type={"MaterialCommunityIcons"} name="calendar" size={24} color={color} />;
                    } else if (route.name === 'AboutStack') {
                        return <Icon type={"MaterialCommunityIcons"} name="account" size={24} color={color} />;
                    }
                },
                headerShown: false,
                tabBarActiveTintColor: "blue"
            })}
            tabBar={props => <MyTabBar {...props} />}

        >

            <Tab.Screen
                name="CalendarStack"
                component={CalendarStack}
                options={{
                    tabBarLabel: 'Calendar',
                }}
            />
            <Tab.Screen
                name="AboutStack"
                component={AboutStack}
                options={{
                    tabBarLabel: 'About',
                }}
            />
        </Tab.Navigator>
    )
}

class MainBttomTabNavigation extends React.Component {
    render() {

        return (
            <NavigationContainer >
                <Stack.Navigator
                    initialRouteName="BottomTabBar"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="BottomTabBar" component={BottomTabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>

        )
    }
}


export default (MainBttomTabNavigation)
