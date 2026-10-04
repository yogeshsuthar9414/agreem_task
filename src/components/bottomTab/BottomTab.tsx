import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import TabBtn from './TabBtn';
import { House, Settings, TextAlignJustify } from 'lucide-react-native';
import { ROUTES } from '../../navigation/routes';
import { useTheme } from '../../theme/ThemeProvider';


interface Props {
    state: any;
    navigation: any;
}

const BottomTab = ({ state, navigation }: Props) => {

    const { colors } = useTheme();

    const tabs = [
        {
            label: 'Home',
            Icon: House,
            route: ROUTES.HOME,
        },
        {
            label: 'Listing',
            Icon: TextAlignJustify,
            route: ROUTES.LISTING,
        },
        {
            label: 'Setting',
            Icon: Settings,
            route: ROUTES.SETTING,
        },
    ];

    return (
        <View style={[styles.container, { borderTopColor: colors.borderMuted, backgroundColor: colors.surface, }]}>
            {tabs.map((item, index) => {
                const { Icon }: any = item;
                return (
                    <TabBtn
                        key={item.route}
                        label={item.label}
                        active={state.index === index}
                        onPress={() => navigation.navigate(item.route)}
                        icon={
                            <Icon
                                size={state.index === index ? 20 : 20}
                                color={
                                    state.index === index ? colors.primaryLight : colors.textMuted
                                }
                    />
                        }
                    />
            )
            })}
        </View>
    );
};

export default BottomTab;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 22,
    },
});