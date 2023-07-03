import { RouteProp, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { IMarker } from "../Home";
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';


type DetailRoute = RouteProp<{ detail: IMarker }, 'detail'>

export default function Detail({ navigation }: any) {
    const { params } = useRoute<DetailRoute>();
    const [address, setAddress] = useState<any>();

    useEffect(() => {
        fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${params.latitude}&lon=${params.longitude}&format=json`
        ).then(async (response) => {
            const data = await response.json();
            setAddress(data);
            navigation.setOptions({
                title: params.name,
            });
        });
    }, []);

    const handleOpenGoogleMaps = () => {
        const latitude = params.latitude;
        const longitude = params.longitude;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    const handleOpenWhatsApp = () => {
        const phoneNumber = params.contact;
        //const url = `whatsapp://send?phone=${encodeURIComponent(phoneNumber)}`;
        const url = `https://wa.me/=${encodeURIComponent(phoneNumber)}`;
        Linking.openURL(url);
    };

    const handleOpenEmail = () => {
        const email = params.email;
        const url = `mailto:${email}`;
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{params.name}</Text>
            <Text style={styles.lineHorizontal} />

            <Text style={styles.subTitle}>{params.description}</Text>
            <Text style={styles.section}>Categoria:</Text>
            <Text style={styles.subTitle}>{params.category}</Text>
            <Text style={styles.lineHorizontal} />
            <Text style={styles.section}>Endereço</Text>
            <View>
                <Text style={styles.text}>{address?.address.road}, {params.number}</Text>
                <Text style={styles.text}>{address?.address.city}</Text>
                <Text style={styles.text}>{address?.address.postcode}</Text>
                <Text style={styles.text}>{address?.address.state}</Text>
                <TouchableOpacity onPress={handleOpenGoogleMaps} style={styles.addressContainer}>
                    <Text style={styles.textMaps}>
                        Click para Navegar<Icon name="location-on" size={18} color="#0061a5" style={styles.mapIcon} />
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.lineHorizontal} />
            <Text style={styles.section}>Contato</Text>
            <TouchableOpacity onPress={handleOpenWhatsApp} style={styles.contactContainer}>
                <Icon name="phone" size={20} color="#0061a5" style={styles.whatsappIcon} />
                <Text style={styles.textMaps}>{params.contact}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenEmail} style={styles.contactContainer}>
                <Icon name="email" size={20} color="green" style={styles.emailIcon} />
                <Text style={styles.textMaps}>{params.email}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F5",
        padding: 20,
    },
    title: {
        color: "#0061a5",
        fontSize: 25,
        fontWeight: "bold"
    },
    subTitle: {
        color: "#898989",
        fontSize: 18,
        fontWeight: "400",
    },
    section: {
        color: "#0061a5",
        fontSize: 16,
        fontWeight: "bold",
        paddingTop: 20
    },
    text: {
        color: "#898989",
        fontSize: 16,
    },
    lineHorizontal: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    mapIcon: {
        marginRight: 10,
    },
    textMaps: {
        color: "#0061a5",
        fontSize: 16,
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        color: "0061a5"
    },
    whatsappIcon: {
        marginRight: 20,
    },
    emailIcon: {
        marginRight: 10,
    }

});
