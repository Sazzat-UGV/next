"use client";

import React, { useState, useEffect } from "react";

interface SafeHTMLProps {
  html: string;
}

export default function SafeHTML({ html }: SafeHTMLProps) {
  const [cleanHTML, setCleanHTML] = useState<string>("");

  useEffect(() => {
    // Run only on client
    import("dompurify").then(({ default: DOMPurify }) => {
      setCleanHTML(DOMPurify.sanitize(html));
    });
  }, [html]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
}
