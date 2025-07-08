"use client";

import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { PostCodeProps } from "@/types/Dashboard/DashboardPostMode/DashboardPostContent/DashboardPostContent";

import styles from "./PostCode.module.css";

const PostCode: React.FC<PostCodeProps> = ({ code }) => {
  return (
    <div className={styles.codeContainer}>
      <SyntaxHighlighter
        language="javascript"
        style={vs2015}
        customStyle={{
          borderRadius: "12px",
          padding: "1rem",
          fontSize: "1rem",
          lineHeight: "2",
          overflowX: "auto", 
          backgroundColor: "#111",
          border: "1px solid #333",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default PostCode;
