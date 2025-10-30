import React from "react";

export default function QlEditor({ text }: any) {
  return (
    <div className="ql-container ql-snow">
      <div
        className="ql-editor !overflow-hidden"
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </div>
  );
}
