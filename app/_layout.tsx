import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
    return (
        <>
            <StatusBar style="light" />

            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#0f172a",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            >
                {/* HOME PAGE */}
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Home",
                    }}
                />

                {/* COIN DETAILS PAGE */}
                <Stack.Screen
                    name="details[id]"
                    options={{
                        title: "Details",
                        headerBackButtonDisplayMode: "minimal",
                        presentation: "card",
                        animation: "slide_from_right",
                        gestureEnabled: true,
                        gestureDirection: "horizontal",
                    }}
                />
            </Stack>
        </>
    );
}
