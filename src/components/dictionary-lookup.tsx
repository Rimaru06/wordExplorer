import type React from "react";

import { useState } from "react";
import { Search, Book, Loader2, X, Volume2 } from "lucide-react";

interface Definition {
  meaning: string;
  example?: string;
  synonyms?: string[];
  partOfSpeech?: string;
}

interface DictionaryResponse {
  word: string;
  phonetic?: string;
  definitions: Definition[];
  error?: string;
}

export default function DictionaryLookup() {
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<DictionaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ...existing code...
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      setError("Please enter a word or phrase to look up");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://searchanymeaning.onrender.com/api/v1/findMeaning",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ word: input.trim() }),
        }
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      // The API returns: { meaning: "meaning1\nmeaning2\nmeaning3" }
      const data = await res.json();
      const meanings: string[] =
        typeof data.meaning === "string"
          ? data.meaning.split("\n").filter(Boolean)
          : [];

      setResponse({
        word: input.trim(),
        definitions: meanings.map((meaning) => ({ meaning })),
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearInput = () => {
    setInput("");
    setResponse(null);
    setError(null);
  };

  return (
    <div className="max-w-2xl w-full mx-auto overflow-hidden rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 shadow-lg border border-indigo-100">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <Book className="h-8 w-8 text-indigo-600" />
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            Word Explorer
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-indigo-400" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 pl-10 pr-12 text-lg border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
              placeholder="Enter any word or phrase..."
            />
            {input && (
              <button
                type="button"
                onClick={clearInput}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 text-lg font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Looking up...
              </>
            ) : (
              <>Find Meaning</>
            )}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl mb-6 animate-fadeIn">
            {error}
          </div>
        )}

        {response && (
          <div className="mt-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-indigo-800">
                {response.word}
              </h3>
              {response.phonetic && (
                <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  <span>{response.phonetic}</span>
                  <button className="p-1 hover:bg-indigo-100 rounded-full transition-colors">
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {response.definitions.map((def, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-indigo-100 shadow-sm"
                >
                  {def.partOfSpeech && (
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full mb-2">
                      {def.partOfSpeech}
                    </span>
                  )}
                  <p className="text-gray-800 text-lg mb-3">{def.meaning}</p>

                  {def.example && (
                    <div className="pl-4 border-l-2 border-indigo-300 mt-2 mb-3">
                      <p className="text-gray-600 italic">"{def.example}"</p>
                    </div>
                  )}

                  {def.synonyms && def.synonyms.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500 mb-1">Synonyms:</p>
                      <div className="flex flex-wrap gap-2">
                        {def.synonyms.map((synonym, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-md"
                          >
                            {synonym}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
