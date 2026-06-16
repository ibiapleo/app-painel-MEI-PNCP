import type { Opportunity } from '@/types/opportunity';

export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
}

export function formatTime(isoDate: string): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

export function formatDateTime(isoDate: string): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

export function getClosingDate(opportunity: Pick<Opportunity, 'closingDate' | 'daysRemaining'>): Date | null {
    if (opportunity.closingDate) {
        return new Date(opportunity.closingDate);
    }

    if (opportunity.daysRemaining !== undefined && opportunity.daysRemaining !== null) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const fallback = new Date(today);
        fallback.setDate(fallback.getDate() + opportunity.daysRemaining);
        return fallback;
    }

    return null;
}

export function isOpportunityExpired(opportunity: Pick<Opportunity, 'isExpired' | 'closingDate' | 'daysRemaining'>): boolean {
    if (opportunity.isExpired !== undefined) {
        return opportunity.isExpired;
    }

    const closing = getClosingDate(opportunity);
    if (!closing) return false;

    return closing.getTime() < Date.now();
}

export function getDeadlineLabel(opportunity: Pick<Opportunity, 'isExpired' | 'closingDate' | 'daysRemaining'>): string {
    if (isOpportunityExpired(opportunity)) {
        if (opportunity.closingDate) {
            return `Encerrado em ${formatDate(opportunity.closingDate)}`;
        }
        return 'Encerrado';
    }

    if (opportunity.daysRemaining === 0) {
        if (opportunity.closingDate) {
            return `Encerra hoje às ${formatTime(opportunity.closingDate)}`;
        }
        return 'Encerra hoje';
    }

    if (opportunity.daysRemaining === 1) {
        if (opportunity.closingDate) {
            return `Encerra amanhã às ${formatTime(opportunity.closingDate)}`;
        }
        return 'Encerra amanhã';
    }

    return `${opportunity.daysRemaining} dias restantes`;
}

export function getCardDeadlineLines(
    opportunity: Pick<Opportunity, 'isExpired' | 'closingDate' | 'daysRemaining'>,
): string[] {
    if (isOpportunityExpired(opportunity)) {
        return opportunity.closingDate
            ? ['Encerrado', formatDate(opportunity.closingDate)]
            : ['Encerrado'];
    }

    const label = getDeadlineLabel(opportunity);
    const timeSplit = label.split(' às ');

    if (timeSplit.length === 2) {
        return [timeSplit[0], `às ${timeSplit[1]}`];
    }

    return [label];
}

export type DeadlineUrgency = 'expired' | 'today' | 'urgent' | 'normal';

export function getDeadlineUrgency(
    opportunity: Pick<Opportunity, 'isExpired' | 'closingDate' | 'daysRemaining'>,
): DeadlineUrgency {
    if (isOpportunityExpired(opportunity)) return 'expired';
    if (opportunity.daysRemaining === 0) return 'today';
    if (opportunity.daysRemaining <= 3) return 'urgent';
    return 'normal';
}

export function sortOpportunitiesByDeadline(opportunities: Opportunity[]): Opportunity[] {
    return [...opportunities].sort((a, b) => {
        const aExpired = isOpportunityExpired(a);
        const bExpired = isOpportunityExpired(b);

        if (aExpired !== bExpired) {
            return aExpired ? 1 : -1;
        }

        const aDate = getClosingDate(a)?.getTime() ?? Number.MAX_SAFE_INTEGER;
        const bDate = getClosingDate(b)?.getTime() ?? Number.MAX_SAFE_INTEGER;

        if (aExpired) {
            return bDate - aDate;
        }

        return aDate - bDate;
    });
}
