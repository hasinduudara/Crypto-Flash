import { View, TextInput, FlatList, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  const searchCoin = async (text: string) => {
    setQuery(text);
    if (!text) return;

    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${text}`
    );
    const data = await res.json();
    setResults(data.coins);
  };

  return (
    <View style={{ padding: 15 }}>
      <TextInput
        placeholder="Search Crypto..."
        value={query}
        onChangeText={searchCoin}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({ pathname: "/coin/[id]", params: { id: item.id } })}>
            <Text style={{ padding: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
