import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Home() {
    const [coins, setCoins] = useState<any[]>([]);
    const [filteredCoins, setFilteredCoins] = useState<any[]>([]); // Store filtered list
    const [search, setSearch] = useState(""); // Store search text
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
            setFilteredCoins(data); // Initialize filtered list with all data
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Search Logic
    const handleSearch = (text: string) => {
        setSearch(text);
        if (text) {
            const newData = coins.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
                const symbolData = item.symbol ? item.symbol.toUpperCase() : "".toUpperCase();
                const textData = text.toUpperCase();

                // Search by Name OR Symbol (e.g., "Bitcoin" or "BTC")
                return itemData.includes(textData) || symbolData.includes(textData);
            });
            setFilteredCoins(newData);
        } else {
            setFilteredCoins(coins); // Reset to full list if search is empty
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#38bdf8" />
                <Text style={{ color: "#fff", marginTop: 10 }}>Loading Crypto Prices...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔥 Top 10 Crypto Coins</Text>

            {/* Search Input */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search Coin (e.g., BTC, ETH)..."
                placeholderTextColor="#94a3b8"
                value={search}
                onChangeText={(text) => handleSearch(text)}
            />

            <FlatList
                data={filteredCoins} // Render the filtered list
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
        backgroundColor: "#0f172a",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    searchInput: {
        backgroundColor: "#1e293b",
        color: "#fff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#334155",
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
        backgroundColor: "#0f172a",
    },
});