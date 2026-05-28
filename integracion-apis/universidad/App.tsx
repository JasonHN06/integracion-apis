import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsignaturaComponent from './components/AsignaturaComponent';
import MaestroComponent from './components/MaestroComponent';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />

      <View style={styles.card}>
        <AsignaturaComponent />
      </View>
      <View style={styles.card}>
        <MaestroComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
  },
});
