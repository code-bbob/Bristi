"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function RevealWords({
  text,
  as = "h2",
  className = "",
  stagger = 90,
  startDelay = 120,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  stagger?: number;
  startDelay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -20px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag ref={ref} className={className}>
      {words.reduce<ReactNode[]>((nodes, word, i) => {
        if (i > 0) nodes.push(" ");
        nodes.push(
          <span
            key={`${word}-${i}`}
            className={`inline-block ${visible ? "word-in" : "opacity-0"}`}
            style={visible ? { animationDelay: `${startDelay + i * stagger}ms` } : undefined}
          >
            {word}
          </span>
        );
        return nodes;
      }, [])}
    </Tag>
  );
}