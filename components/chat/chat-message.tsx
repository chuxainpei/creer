"use client";

import type { Message } from "./chat-workspace";

interface ChatMessageProps {
  message: Message;
}

// Simple markdown-like renderer for chat messages
function renderContent(content: string): React.ReactNode {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading h2 (##)
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-lg font-bold mt-5 mb-2 text-accent-navy">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // Heading h3 (###)
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-base font-semibold mt-4 mb-1.5 text-text-primary">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Horizontal rule (---)
    if (line.trim() === "---") {
      elements.push(<hr key={i} className="border-border my-4" />);
      i++;
      continue;
    }

    // Blockquote (> )
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-[3px] border-accent-amber pl-4 py-1 my-2 bg-surface-hover/50 rounded-r text-sm text-text-secondary italic">
          {line.slice(2)}
        </blockquote>
      );
      i++;
      continue;
    }

    // Table detection (| ... |)
    if (line.startsWith("|") && line.endsWith("|")) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableRows.push(lines[i]);
        i++;
      }

      // Parse table
      const headerRow = tableRows[0];
      const separatorRow = tableRows[1];
      const dataRows = tableRows.slice(2);

      if (headerRow && separatorRow && separatorRow.includes("---")) {
        const headers = headerRow.split("|").filter(Boolean).map((h) => h.trim());
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {headers.map((h, hi) => (
                    <th key={hi} className="text-left p-2 border-b-2 border-border font-semibold text-text-secondary bg-surface-hover/50">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, ri) => {
                  const cells = row.split("|").filter(Boolean).map((c) => c.trim());
                  return (
                    <tr key={ri}>
                      {cells.map((cell, ci) => (
                        <td key={ci} className="p-2 border-b border-border/50">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      } else {
        // Not a valid table, render as text
        for (const row of tableRows) {
          elements.push(<p key={`${i}-${row}`} className="text-sm font-mono text-text-secondary/70">{row}</p>);
        }
      }
      continue;
    }

    // Bold (**text**)
    let processed = line;
    // Process bold
    const parts = processed.split(/(\*\*[^*]+\*\*)/g);
    const children: React.ReactNode[] = [];
    parts.forEach((part, pi) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        children.push(
          <strong key={pi} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      } else if (part) {
        children.push(part);
      }
    });

    // List items
    if (line.match(/^[\s]*[\-\d]+[\.\)]\s/)) {
      elements.push(
        <li key={i} className="ml-5 mb-0.5 list-disc">
          <span>{children}</span>
        </li>
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="mb-1 leading-relaxed">
        {children.length > 0 ? children : line}
      </p>
    );
    i++;
  }

  return <>{elements}</>;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-navy/10 flex items-center justify-center text-sm mt-1">
          🎓
        </div>
      )}

      {/* Content */}
      <div
        className={`max-w-[85%] sm:max-w-[75%] ${
          isUser
            ? "bg-accent-navy text-white px-5 py-3"
            : "bg-white border border-border/60 px-6 py-4"
        }`}
      >
        {isUser ? (
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        ) : (
          <div className="chat-markdown text-[15px] leading-relaxed text-text-primary">
            {renderContent(message.content)}
            {message.isStreaming && (
              <span className="inline-block w-1.5 h-4 bg-accent-navy/50 animate-pulse ml-0.5 align-text-bottom" />
            )}
          </div>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-amber/15 flex items-center justify-center text-sm mt-1">
          👤
        </div>
      )}
    </div>
  );
}
