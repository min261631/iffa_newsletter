"use client";
import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle"|"sending"|"done"|"error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setState("done");
      setEmail("");
    } catch (e) {
      console.error(e);
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
          />
        </div>
        <button 
          type="submit"
          disabled={state === "sending"} 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {state === "sending" ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing...
            </div>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
      
      {/* Status Messages */}
      {state === "done" && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm text-center flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Success! Check your inbox for confirmation.
          </p>
        </div>
      )}
      
      {state === "error" && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm text-center flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Something went wrong. Please try again.
          </p>
        </div>
      )}
      
      <p className="text-xs text-gray-500 text-center mt-3">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}
