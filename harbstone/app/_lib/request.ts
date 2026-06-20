export interface ProjectRequestPayload {
    fields: Record<string, string>;
    budget: string;
}

interface ProjectRequestResponse {
    message?: string;
    ok?: boolean;
}

export async function sendProjectRequest(payload: ProjectRequestPayload) {
    const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const result = await response.json().catch((): ProjectRequestResponse | null => null);
        throw new Error(result?.message || 'Request was not sent');
    }
}
