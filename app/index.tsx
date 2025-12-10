import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Home() {
    const [coins, setCoins] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchCrypto();
    }, []);

    const fetchCrypto = async () => {
        try {
            const res = await fetch(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
            );
            const data = await res.json();
            setCoins(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading Crypto Prices...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔥 Top 10 Crypto Coins</Text>

            <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            router.push({ pathname: "/details", params: { id: item.id } })
                        }
                    >
                        <View style={styles.row}>
                            <Image source={{ uri: item.image }} style={styles.image} />

                            <View style={{ flex: 1 }}>
                                <Text style={styles.coinName}>{item.name}</Text>
                                <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
                            </View>

                            <View style={{ alignItems: "flex-end" }}>
                                <Text style={styles.price}>${item.current_price}</Text>

                                <Text
                                    style={{
                                        color: item.price_change_percentage_24h > 0 ? "green" : "red",
                                        fontSize: 12,
                                    }}
                                >
                                    {item.price_change_percentage_24h.toFixed(2)}%
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: "#0f172a", // dark background
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    card: {
        backgroundColor: "#1e293b",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 45,
        height: 45,
        marginRight: 12,
    },
    coinName: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    symbol: {
        color: "#94a3b8",
        fontSize: 12,
    },
    price: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
