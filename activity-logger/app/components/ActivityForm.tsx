import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  onSubmit: (name: string, duration: number, notes?: string) => void;
}

interface FormErrors {
  name?: string;
  duration?: string;
}

export function ActivityForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const durationRef = useRef<TextInput>(null);
  const notesRef = useRef<TextInput>(null);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!name.trim()) {
      next.name = 'Activity name is required';
    }
    if (!duration.trim()) {
      next.duration = 'Duration is required';
    } else if (isNaN(Number(duration)) || Number(duration) <= 0) {
      next.duration = 'Enter a valid number of minutes';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(name, Number(duration), notes || undefined);
    setName('');
    setDuration('');
    setNotes('');
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Log a New Activity</Text>

      <Text style={styles.label}>Activity Name *</Text>
      <TextInput
        style={[styles.input, errors.name ? styles.inputError : null]}
        value={name}
        onChangeText={text => {
          setName(text);
          if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
        }}
        placeholder="e.g. Running"
        placeholderTextColor="#aaa"
        returnKeyType="next"
        onSubmitEditing={() => durationRef.current?.focus()}
        blurOnSubmit={false}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <Text style={styles.label}>Duration (minutes) *</Text>
      <TextInput
        ref={durationRef}
        style={[styles.input, errors.duration ? styles.inputError : null]}
        value={duration}
        onChangeText={text => {
          setDuration(text);
          if (errors.duration) setErrors(prev => ({ ...prev, duration: undefined }));
        }}
        placeholder="e.g. 30"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => notesRef.current?.focus()}
        blurOnSubmit={false}
      />
      {errors.duration ? <Text style={styles.errorText}>{errors.duration}</Text> : null}

      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput
        ref={notesRef}
        style={[styles.input, styles.notesInput]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Any extra details…"
        placeholderTextColor="#aaa"
        multiline
        numberOfLines={3}
        returnKeyType="done"
        blurOnSubmit
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Log Activity</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 15,
    color: '#111',
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#e53935',
  },
  notesInput: {
    height: 70,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 12,
    color: '#e53935',
    marginTop: 3,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#1565c0',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
