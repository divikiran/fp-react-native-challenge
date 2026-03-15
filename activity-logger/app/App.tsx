import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ActivityForm } from './components/ActivityForm';
import { ActivityList } from './components/ActivityList';
import { useActivities } from './hooks/useActivities';

export default function App() {
  const { activities, loaded, addActivity, deleteActivity } = useActivities();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Activity Logger</Text>
        </View>
        <KeyboardAvoidingView
          style={styles.body}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <ActivityForm onSubmit={addActivity} />
          {/* Delay rendering the list until the initial load from storage is done
              so we never flash an empty-state before data appears. */}
          {loaded && (
            <ActivityList activities={activities} onDelete={deleteActivity} />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1565c0', // matches header so safe-area fill looks right
  },
  header: {
    backgroundColor: '#1565c0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  body: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
