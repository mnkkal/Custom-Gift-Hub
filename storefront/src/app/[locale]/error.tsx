'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/platform/i18n/navigation';

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Next.js Page Error caught by boundary:', error);
    }, [error]);

    return (
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Something went wrong!</h2>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
                We encountered an unexpected issue while loading this page.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => reset()} variant="default">
                    Try again
                </Button>
                <Button render={<Link href="/" />} nativeButton={false} variant="outline">
                    Back to Home
                </Button>
            </div>
        </div>
    );
}
