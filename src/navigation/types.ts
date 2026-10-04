import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    splash: undefined;
    dashboard: undefined;
    main: undefined;
    event: undefined;
    favourites: undefined;
    profile: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;