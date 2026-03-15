import { useCallback, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Activity } from '../types';

const STORAGE_KEY = '@activities';

// ─── State & Reducer ─────────────────────────────────────────────────────────

interface State {
  activities: Activity[];
  loaded: boolean; // true once the initial AsyncStorage read has finished
}

type Action =
  | { type: 'LOAD'; payload: Activity[] }
  | { type: 'ADD'; payload: Activity }
  | { type: 'DELETE'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD':
      return { activities: action.payload, loaded: true };
    case 'ADD':
      return { ...state, activities: [action.payload, ...state.activities] };
    case 'DELETE':
      return { ...state, activities: state.activities.filter(a => a.id !== action.payload) };
    default:
      return state;
  }
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useActivities() {
  const [{ activities, loaded }, dispatch] = useReducer(reducer, {
    activities: [],
    loaded: false,
  });

  // Load persisted data on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(raw => {
        const data: Activity[] = raw ? (JSON.parse(raw) as Activity[]) : [];
        dispatch({ type: 'LOAD', payload: data });
      })
      .catch(() => dispatch({ type: 'LOAD', payload: [] }));
  }, []);

  // Persist whenever activities change (skip the initial empty state)
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(activities)).catch(() => {});
  }, [activities, loaded]);

  const addActivity = useCallback(
    (name: string, duration: number, notes?: string) => {
      const activity: Activity = {
        id: Date.now().toString(),
        name: name.trim(),
        duration,
        notes: notes?.trim() || undefined,
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD', payload: activity });
    },
    [],
  );

  const deleteActivity = useCallback((id: string) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  return { activities, loaded, addActivity, deleteActivity };
}
