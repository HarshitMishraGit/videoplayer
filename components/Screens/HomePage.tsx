import React from 'react';
import { View, Text } from 'react-native';

const HomePage: React.FC = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'blue', fontSize: 24 }}>Welcome to the Homepage!</Text>
            <Text style={{ fontSize: 18 }}>This is the starting point of your application.</Text>
        </View>
    );
};

export default HomePage;
