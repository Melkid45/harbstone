interface RequestPayload {
    fields?: Record<string, unknown>;
    budget?: unknown;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s-]{6,}$/;

function getStringField(fields: Record<string, unknown>, key: string) {
    const value = fields[key];
    return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function validatePayload(payload: RequestPayload) {
    const fields = payload.fields && typeof payload.fields === 'object' ? payload.fields : {};
    const name = getStringField(fields, 'name');
    const email = getStringField(fields, 'email');
    const phone = getStringField(fields, 'phone');
    const message = getStringField(fields, 'message');
    const budget = typeof payload.budget === 'string' ? payload.budget.trim() : '';

    if (!name || !email || !phone || !message || !budget) {
        return { error: 'Fill in all required fields' };
    }

    if (!emailPattern.test(email)) {
        return { error: 'Enter a valid email' };
    }

    if (!phonePattern.test(phone)) {
        return { error: 'Enter a valid phone number' };
    }

    if (message.length < 10) {
        return { error: 'Tell us a little more about the project' };
    }

    return {
        data: {
            name,
            email,
            phone,
            message,
            budget,
        },
    };
}

export async function POST(request: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.REQUEST_TO_EMAIL;

    if (!apiKey || !from || !to || apiKey.includes('replace_me')) {
        return Response.json(
            { message: 'Email service is not configured yet' },
            { status: 500 }
        );
    }

    let payload: RequestPayload;

    try {
        payload = await request.json();
    } catch {
        return Response.json({ message: 'Invalid request body' }, { status: 400 });
    }

    const validation = validatePayload(payload);

    if ('error' in validation) {
        return Response.json({ message: validation.error }, { status: 400 });
    }

    const { name, email, phone, message, budget } = validation.data;
    const html = `
        <h1>New project request</h1>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from,
            to: [to],
            reply_to: email,
            subject: `New project request from ${name}`,
            html,
        }),
    });

    if (!resendResponse.ok) {
        return Response.json(
            { message: 'Email was not sent. Please try again later.' },
            { status: 502 }
        );
    }

    return Response.json({ ok: true });
}
