import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { categories } from './categories';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export interface IMarker {
    category: string;
    contact: string;
    email: string;
    description: string;
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    number: string;
}

export default function Home({ navigation }: any) {
    const [markers, setMarkers] = useState<IMarker[]>([]);
    const [filter, setFilter] = useState("");
    const [currentLocation, setCurrentLocation] = useState({
        latitude: -25.507449372094356,
        longitude: -49.259793568177415,
    });
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        fetch("http://192.168.15.207:3002/store")
            .then(async (request) => {
                const data = await request.json();
                setMarkers(data);
                setRefreshing(false);
            })
            .catch((error) => {
                console.error(error);
                setRefreshing(false);
            });
    };

    const filteredData = markers.filter((m) => m.category === filter);

    useEffect(() => {
        fetch("http://192.168.15.207:3002/store").then(async (request) => {
            const data = await request.json();
            setMarkers(data);
        });
    }, []);

    if (!markers || markers.length === 0) {
        return <ActivityIndicator />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Bem Vindo</Text>
                <Text style={styles.subTitle}>Encontre no mapa um ponto do comércio Local ou filtre uma Categoria</Text>
                <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                    <Icon name="refresh" size={24} color="#0061a5" />
                </TouchableOpacity>
            </View>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {(filter ? filteredData : markers).map((item) => {
                    return (
                        <Marker
                            key={item.id}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                            }}
                            onPress={() => {
                                navigation.navigate("Detail", item);
                            }}
                        />
                    );
                })}
            </MapView>

            <View style={styles.categoryContainer}>
                <Text style={styles.subTitleCategory}>Categorias</Text>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center'
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            setFilter(filter == item.key ? "" : item.key);
                        }}
                            style={[
                                styles.categoryItem,
                                filter === item.key ? styles.selectedCategory : null,
                            ]}
                            key={item.key}>
                            <Image style={styles.categoryImage} source={item.image} />
                            <Text style={styles.categoryText}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    headerContainer: {
        padding: 24,
        paddingTop: Platform.OS === 'android' ? 50 : 0
    },
    title: {
        fontSize: 24,
        fontWeight: "400",
        color: "#0061a5"
    },
    subTitle: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: "400",
        color: "#898989"
    },
    map: {
        flex: 1
    },
    categoryContainer: {
        padding: 10
    },
    categoryItem: {
        height: 70,
        backgroundColor: "#f0f0f5",
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginLeft: 12
    },
    categoryImage: {
        width: 50,
        height: 50,
    },
    categoryText: {
        textAlign: "center",
        color: "#898989",
    },
    selectedCategory: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#0061a5",
    },
    subTitleCategory: {
        textAlign: "center",
        color: "#0061a5",
        marginBottom: 2
    },
    refreshButton: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 50 : 10,
        right: 10,
    },
});
