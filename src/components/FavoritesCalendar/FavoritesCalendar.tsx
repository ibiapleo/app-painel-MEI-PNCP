import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type MarkType = 'past' | 'future';

interface FavoritesCalendarProps {
    month: Date;
    markedDates: Map<string, MarkType>;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

const WEEKDAY_LABELS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
const MONTH_LABELS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function pad(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
}

function toKey(year: number, month: number, day: number): string {
    return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function buildGrid(year: number, month: number): (number | null)[] {
    const firstDay = new Date(year, month, 1);
    const jsWeekday = firstDay.getDay();
    const mondayOffset = (jsWeekday + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [];
    for (let i = 0; i < mondayOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

export function FavoritesCalendar({
    month,
    markedDates,
    onPrevMonth,
    onNextMonth,
}: FavoritesCalendarProps) {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const cells = buildGrid(year, monthIndex);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    {MONTH_LABELS[monthIndex]} {year}
                </Text>
                <View style={styles.nav}>
                    <Pressable onPress={onPrevMonth} hitSlop={10} style={styles.navButton}>
                        <Feather name="chevron-left" size={20} color="#202124" />
                    </Pressable>
                    <Pressable onPress={onNextMonth} hitSlop={10} style={styles.navButton}>
                        <Feather name="chevron-right" size={20} color="#202124" />
                    </Pressable>
                </View>
            </View>

            <View style={styles.weekRow}>
                {WEEKDAY_LABELS.map((label) => (
                    <Text key={label} style={styles.weekLabel}>
                        {label}
                    </Text>
                ))}
            </View>

            <View style={styles.grid}>
                {cells.map((day, idx) => {
                    if (day === null) {
                        return <View key={`empty-${idx}`} style={styles.cell} />;
                    }
                    const key = toKey(year, monthIndex, day);
                    const mark = markedDates.get(key);

                    return (
                        <View key={`day-${day}`} style={styles.cell}>
                            <View
                                style={[
                                    styles.dayCircle,
                                    mark === 'future' && styles.dayCircleFuture,
                                    mark === 'past' && styles.dayCirclePast,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dayText,
                                        mark === 'future' && styles.dayTextOnPrimary,
                                    ]}
                                >
                                    {day}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#202124',
    },
    nav: {
        flexDirection: 'row',
        gap: 12,
    },
    navButton: {
        padding: 4,
    },
    weekRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    weekLabel: {
        flex: 1,
        textAlign: 'center',
        fontSize: 11,
        fontWeight: '600',
        color: '#A6A6AA',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cell: {
        width: `${100 / 7}%`,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCircleFuture: {
        backgroundColor: '#0877FF',
    },
    dayCirclePast: {
        backgroundColor: '#D4D6DB',
    },
    dayText: {
        fontSize: 14,
        color: '#202124',
        fontWeight: '500',
    },
    dayTextOnPrimary: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
});
