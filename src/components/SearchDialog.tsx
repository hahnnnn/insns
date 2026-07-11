"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import searchIndex from "@/data/search-index.json";

interface SearchResult {
  slug: string;
  title: string;
  type: string;
  description?: string;
  tags?: string;
}

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = (searchIndex as SearchResult[]).filter((item) => {
      return (
        item.title.toLowerCase().includes(lowerQuery) ||
        (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
        (item.tags && item.tags.toLowerCase().includes(lowerQuery))
      );
    });

    setResults(filtered.slice(0, 20));
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [results, selectedIndex, onClose]
  );

  if (!open) return null;

  const typeLabels: Record<string, string> = {
    research: "Research",
    publications: "Publications",
    journal: "Journal",
    projects: "Projects",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[600px] mx-4 bg-background border border-border shadow-2xl">
        <div className="flex items-center border-b border-border px-4">
          <Search size={16} className="text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search research, publications, journal..."
            className="flex-1 bg-transparent border-none outline-none py-4 px-3 text-sm text-foreground placeholder:text-muted"
          />
          <button
            onClick={onClose}
            className="text-xs text-muted hover:text-foreground px-2 py-1 border border-border"
          >
            Esc
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-0.5">
            {results.map((result, i) => (
              <Link
                key={`${result.type}/${result.slug}`}
                href={`/${result.type}/${result.slug}`}
                onClick={onClose}
                className={`block px-3 py-3 text-sm transition-colors ${
                  i === selectedIndex ? "bg-surface-muted" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs text-muted uppercase tracking-wider">
                    {typeLabels[result.type] || result.type}
                  </span>
                </div>
                <p className="font-medium">{result.title}</p>
                {result.description && (
                  <p className="text-xs text-muted mt-0.5 line-clamp-1">
                    {result.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-sm text-muted">No results found for &ldquo;{query}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}
