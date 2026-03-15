import React from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Activity } from '../types';

interface Props {
  activities: Activity[];
  onDelete: (id: string) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function groupByDate(activities: Activity[]): { title: string; data: Activity[] }[] {
  const map = new Map<string, Activity[]>();
  for (const a of activities) {
    const key = new Date(a.createdAt).toDateString();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(a);
  }
  return Array.from(map.entries()).map(([, data]) => ({
    title: formatDate(data[0].createdAt),
    data,
  }));
}

function totalMinutes(list: Activity[]): number {
  return list.reduce((sum, a) => sum + a.duration, 0);
}

// ─── Components ──────────────────────────────────────────────────────────────

function TotalBanner({ activities }: { activities: Activity[] }) {
  return (
    <View style={styles.totalBanner}>
      <Text style={styles.totalLabel}>Total time logged</Text>
      <Text style={styles.totalValue}>{formatDuration(totalMinutes(activities))}</Text>
    </View>
  );
}

function SectionHeader({ title, data }: { title: string; data: Activity[] }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionTotal}>{formatDuration(totalMinutes(data))}</Text>
    </View>
  );
}

function ActivityCard({
  activity,
  onDelete,
}: {
  activity: Activity;
  onDelete: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{activity.name}</Text>
        <Text style={styles.cardMeta}>
          {activity.duration} min · {formatTime(activity.createdAt)}
        </Text>
        {activity.notes ? (
          <Text style={styles.cardNotes}>{activity.notes}</Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={onDelete}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityLabel={`Delete ${activity.name}`}
      >
        <Text style={styles.deleteBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ActivityList({ activities, onDelete }: Props) {
  if (activities.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No activities yet</Text>
        <Text style={styles.emptySubtitle}>Fill in the form above to get started!</Text>
      </View>
    );
  }

  const sections = groupByDate(activities);

  return (
    <SectionList
      sections={sections}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      stickySectionHeadersEnabled
      ListHeaderComponent={<TotalBanner activities={activities} />}
      renderSectionHeader={({ section }) => (
        <SectionHeader title={section.title} data={section.data} />
      )}
      renderItem={({ item }) => (
        <ActivityCard activity={item} onDelete={() => onDelete(item.id)} />
      )}
    />
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  list: {
    paddingBottom: 40,
  },
  totalBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0d47a1',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  totalLabel: {
    color: '#90caf9',
    fontSize: 13,
    fontWeight: '600',
  },
  totalValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: '#e8eaf6',
    borderBottomWidth: 1,
    borderBottomColor: '#c5cae9',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1565c0',
  },
  sectionTotal: {
    fontSize: 13,
    color: '#555',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  cardBody: {
    flex: 1,
  },
  cardName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  cardMeta: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  cardNotes: {
    fontSize: 13,
    color: '#888',
    marginTop: 5,
    fontStyle: 'italic',
  },
  deleteBtn: {
    padding: 6,
    marginLeft: 8,
  },
  deleteBtnText: {
    fontSize: 15,
    color: '#bbb',
    fontWeight: '700',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});
