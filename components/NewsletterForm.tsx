'use client';

import React, { useRef, useState } from 'react';
import siteMetadata from '@/data/siteMetadata';

const NewsletterForm = ({ title = 'Subscribe to the newsletter' }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputEl.current) return;
    if (!siteMetadata.newsletter?.provider) {
      setError(true);
      setMessage('Newsletter provider is not configured.');
      return;
    }

    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error: apiError } = await res.json();
    if (apiError) {
      setError(true);
      setMessage('Your subscription request failed. Please try again.');
      return;
    }

    inputEl.current.value = '';
    setError(false);
    setSubscribed(true);
    setMessage('Successfully! 🎉 You are now subscribed.');
  };

  return (
    <div className="w-full">
      <div className="pb-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </div>
      <form className="flex flex-col gap-2 sm:flex-row" onSubmit={subscribe}>
        <div className="flex-grow">
          <label htmlFor="email-input" className="sr-only">
            Email address
          </label>
          <input
            autoComplete="email"
            className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:ring-1 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100"
            id="email-input"
            name="email"
            placeholder={
              subscribed ? "You're subscribed! 🎉" : 'Enter your email'
            }
            ref={inputEl}
            required
            type="email"
            disabled={subscribed}
          />
        </div>
        <button
          className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            subscribed
              ? 'cursor-default bg-gray-100 text-gray-400 dark:bg-gray-800'
              : 'bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200'
          }`}
          type="submit"
          disabled={subscribed}
        >
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </form>
      {error && (
        <div className="mt-2 text-xs font-medium text-red-500 dark:text-red-400">
          {message}
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;
