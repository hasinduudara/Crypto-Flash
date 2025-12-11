import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function CoinDetails() {
    const { id } = useLocalSearchParams();
    const [coin, setCoin] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then((res) => res.json())
            .then((data) => setCoin(data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    // Monetag Ad Link එක Open කරන Function එක
    const openAdLink = () => {
        const adUrl = "https://otieu.com/4/10245086";
        Linking.openURL(adUrl).catch((err) => console.error("Error opening link", err));
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text style={{ color: "#fff", marginTop: 10 }}>
                    Loading Coin Details...
                </Text>
            </View>
        );
    }

    if (!coin) {
        return (
            <View style={styles.center}>
                <Text style={{ color: "red" }}>Failed to load coin data.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Header Card */}
            <View style={styles.headerCard}>
                <Image source={{ uri: coin.image.large }} style={styles.image} />
                <Text style={styles.coinName}>{coin.name}</Text>
                <Text style={styles.symbol}>{coin.symbol.toUpperCase()}</Text>
            </View>

            {/* Price Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>💰 Current Price</Text>
                <Text style={styles.price}>
                    ${coin.market_data.current_price.usd}
                </Text>

                <Text
                    style={{
                        color:
                            coin.market_data.price_change_percentage_24h > 0
                                ? "green"
                                : "red",
                        fontSize: 14,
                    }}
                >
                    {coin.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
                </Text>
            </View>

            {/* Market Info */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>📊 Market Info</Text>
                <Text style={styles.info}>
                    Market Cap: ${coin.market_data.market_cap.usd}
                </Text>
                <Text style={styles.info}>
                    24h High: ${coin.market_data.high_24h.usd}
                </Text>
                <Text style={styles.info}>
                    24h Low: ${coin.market_data.low_24h.usd}
                </Text>
            </View>

            {/* 🔥 Monetag AD BUTTON 🔥 */}
            <TouchableOpacity style={styles.adButton} onPress={openAdLink}>
                <Text style={styles.adButtonText}>🎁 Click this link to get free crypto</Text>
            </TouchableOpacity>

            {/* Description */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>📘 About {coin.name}</Text>
                <Text style={styles.description}>
                    {coin.description.en
                        ? coin.description.en.slice(0, 400) + "..."
                        : "No description available."}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
        padding: 12,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f172a",
    },
    headerCard: {
        backgroundColor: "#1e293b",
        borderRadius: 16,
        alignItems: "center",
        padding: 20,
        marginBottom: 15,
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    coinName: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
    symbol: {
        color: "#94a3b8",
        fontSize: 14,
    },
    card: {
        backgroundColor: "#1e293b",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    cardTitle: {
        color: "#38bdf8",
        fontSize: 14,
        marginBottom: 6,
    },
    price: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
    info: {
        color: "#e5e7eb",
        marginTop: 4,
        fontSize: 14,
    },
    description: {
        color: "#e5e7eb",
        marginTop: 6,
        fontSize: 14,
        lineHeight: 20,
    },
    // අලුතින් එක් කළ Button Styles
    adButton: {
        backgroundColor: "#FFD700", // Gold color for Crypto vibes
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#FFA500",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // Android shadow
    },
    adButtonText: {
        color: "#000", // Black text for readability
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    }
});