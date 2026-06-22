'use client';

import { ArrowUpRight } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import Button from "../../general/Button/Button";
import { sendProjectRequest } from "../../../_lib/request";
import styles from './RequestBlock.module.scss';

export interface RequestInput {
    name: string;
    type: string;
    placeholder: string;
    error?: string;
}

interface RequestFormProps {
    inputs: RequestInput[];
    pricing: {
        price: string;
    }[];
    variant?: 'footer' | 'popup';
}

type RequestValues = Record<string, string>;
type RequestErrors = Record<string, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s-]{6,}$/;

function getFieldError(input: RequestInput, value: string) {
    const trimmedValue = value.trim();
    const label = input.placeholder.replace(/^Your\s+/i, '').trim();
    const fallbackError = input.error || `${label || 'This field'} is required`;

    if (!trimmedValue) {
        return fallbackError;
    }

    if (input.type === 'email' && !emailPattern.test(trimmedValue)) {
        return input.error || 'Enter a valid email';
    }

    if (input.type === 'tel' && !phonePattern.test(trimmedValue)) {
        return input.error || 'Enter a valid phone number';
    }

    if (input.name === 'message' && trimmedValue.length < 10) {
        return input.error || 'Tell us a little more about the project';
    }

    return '';
}

export default function RequestForm({
    inputs,
    pricing,
    variant = 'footer'
}: RequestFormProps) {
    const initialValues = useMemo(
        () => inputs.reduce<RequestValues>((values, input) => {
            values[input.name] = '';
            return values;
        }, {}),
        [inputs]
    );
    const [values, setValues] = useState<RequestValues>(initialValues);
    const [selectedBudget, setSelectedBudget] = useState('');
    const [errors, setErrors] = useState<RequestErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formError, setFormError] = useState('');
    const isPopup = variant === 'popup';

    const validateForm = () => {
        const nextErrors = inputs.reduce<RequestErrors>((fieldErrors, input) => {
            const fieldError = getFieldError(input, values[input.name] || '');

            if (fieldError) {
                fieldErrors[input.name] = fieldError;
            }

            return fieldErrors;
        }, {});

        if (!selectedBudget) {
            nextErrors.price = 'Choose a project budget';
        }

        setErrors(nextErrors);
        return nextErrors;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError('');
        setIsSuccess(false);

        const nextErrors = validateForm();

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        try {
            await sendProjectRequest({
                fields: values,
                budget: selectedBudget,
            });

            setValues(initialValues);
            setSelectedBudget('');
            setErrors({});
            setIsSuccess(true);
        } catch (error) {
            setFormError(error instanceof Error ? error.message : 'Request was not sent');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`${styles.request} ${styles[`request--${variant}`]}`}>
            <form
                noValidate
                onSubmit={handleSubmit}
                className={`${styles.request__form} ${isSuccess ? styles['request__form--success'] : ''}`}
                id={isPopup ? 'popupFeedbackForm' : 'feedbackForm'}
            >
                <div className={styles.request__fields}>
                    {inputs.map((input) => {
                        const fieldError = errors[input.name];
                        const fieldId = `${isPopup ? 'popup-request' : 'request'}-${input.name}`;
                        const isTextarea = input.type === 'textarea' || input.name === 'message';
                        const fieldClassName = `
                            ${styles.request__field}
                            ${isPopup ? styles['request__field--light'] : styles['request__field--dark']}
                            ${fieldError ? styles['request__field--invalid'] : ''}
                            text text--medium ${isPopup ? 'text--dark-color' : 'text--white-color'}
                        `;

                        return (
                            <div
                                key={input.name}
                                className={styles.request__fieldWrap}
                            >
                                {isTextarea ? (
                                    <textarea
                                        id={fieldId}
                                        className={fieldClassName}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        rows={1}
                                        value={values[input.name] || ''}
                                        aria-invalid={Boolean(fieldError)}
                                        aria-describedby={fieldError ? `${fieldId}-error` : undefined}
                                        onChange={(event) => {
                                            setValues((currentValues) => ({
                                                ...currentValues,
                                                [input.name]: event.target.value,
                                            }));
                                            setErrors((currentErrors) => ({
                                                ...currentErrors,
                                                [input.name]: '',
                                            }));
                                        }}
                                    />
                                ) : (
                                    <input
                                        id={fieldId}
                                        className={fieldClassName}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        type={input.type}
                                        value={values[input.name] || ''}
                                        aria-invalid={Boolean(fieldError)}
                                        aria-describedby={fieldError ? `${fieldId}-error` : undefined}
                                        onChange={(event) => {
                                            setValues((currentValues) => ({
                                                ...currentValues,
                                                [input.name]: event.target.value,
                                            }));
                                            setErrors((currentErrors) => ({
                                                ...currentErrors,
                                                [input.name]: '',
                                            }));
                                        }}
                                    />
                                )}
                                {fieldError && (
                                    <span id={`${fieldId}-error`} className={styles.request__error}>
                                        {fieldError}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className={`${styles.request__bottom} ${isPopup ? styles['request__bottom--full'] : ''}`}>
                    <div className={styles.request__budget}>
                        <h3 className={`text text--medium ${isPopup ? 'text--dark-color' : 'text--white-color'}`}>
                            Project budget
                        </h3>
                        <div
                            className={`
                                ${styles['request__budget-options']}
                                ${isPopup ? styles['request__budget-options--grid'] : ''}
                                ${errors.price ? styles['request__budget-options--invalid'] : ''}
                            `}
                        >
                            {pricing.map((item) => (
                                <button
                                    key={item.price}
                                    type="button"
                                    className={`
                                        ${styles.request__price}
                                        ${isPopup ? styles['request__price--light'] : ''}
                                        ${selectedBudget === item.price ? styles['request__price--active'] : ''}
                                        text text--medium
                                    `}
                                    aria-pressed={selectedBudget === item.price}
                                    onClick={() => {
                                        setSelectedBudget(item.price);
                                        setErrors((currentErrors) => ({
                                            ...currentErrors,
                                            price: '',
                                        }));
                                    }}
                                >
                                    {item.price}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        customClass={styles.request__submit}
                        size="large"
                        background={isPopup ? 'dark' : 'white'}
                        color={isPopup ? 'white' : 'dark'}
                        border={isPopup ? 'dark' : 'white'}
                    >
                        <ArrowUpRight />
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </Button>
                </div>
                {formError && (
                    <p className={`${styles.request__formError} text text--small`}>
                        {formError}
                    </p>
                )}
                <div className={styles.request__success} role="dialog" aria-modal="true" aria-live="polite">
                    <h3 className={`heading heading--font-1 heading--standard ${isPopup ? 'heading--dark-color' : 'heading--white-color'}`}>
                        Thanks! We heard you.
                    </h3>
                    <p className={`text text--small ${isPopup ? 'text--dark-color' : 'text--white-color'}`}>
                        We&apos;ll review your request and contact you soon.
                    </p>
                    <Button
                        type="button"
                        size="medium"
                        background={isPopup ? 'dark' : 'white'}
                        color={isPopup ? 'white' : 'dark'}
                        border={isPopup ? 'dark' : 'white'}
                        onClick={() => setIsSuccess(false)}
                    >
                        Close
                    </Button>
                </div>
            </form>
        </div>
    )
}
