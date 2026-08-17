'use server';

import Booking from '@/database/booking.model';

import connectDB from "../mongodb";
import { getPostHogClient } from "../posthog-server";

export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string; }) => {
    try {
        await connectDB();

        await Booking.create({ eventId, slug, email });

        const posthog = getPostHogClient();
        posthog.capture({
            distinctId: email,
            event: 'booking_created',
            properties: { event_id: eventId, slug },
        });
        await posthog.flush();

        return { success: true };
    } catch (e) {
        console.error('create booking failed', e);

        const posthog = getPostHogClient();
        posthog.capture({
            distinctId: 'anonymous',
            event: 'booking_failed',
            properties: { event_id: eventId, slug },
        });
        await posthog.flush();

        return { success: false };
    }
}