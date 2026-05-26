
"use client";
import { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

interface LexicalNode {
  type: string;
  text?: string;
  tag?: string;
  listType?: string;
  children?: LexicalNode[];
}

interface LexicalContent {
  root: {
    children: LexicalNode[];
  };
}

interface LexicalRendererProps {
  content: string;
}

export function LexicalRenderer({ content }: LexicalRendererProps) {
  const [parsedContent, setParsedContent] = useState<LexicalContent | null>(null);
  const [isHtml, setIsHtml] = useState(false);

  useEffect(() => {
    try {
      const parsed = JSON.parse(content) as LexicalContent;
      setParsedContent(parsed);
      setIsHtml(false);
    } catch {
      // Content is plain HTML, not Lexical JSON — render as HTML fallback
      setIsHtml(true);
    }
  }, [content]);

  const renderNode = (node: LexicalNode, index: number): JSX.Element | null => {
    if (!node) return null;

    switch (node.type) {
      case 'heading': {
        const tag = node.tag || 'h2';
        const validHeadingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        const HeadingTag = validHeadingTags.includes(tag)
          ? (tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')
          : 'h2';
        return (
          <HeadingTag key={index} className="font-bold tracking-tight">
            {node.children?.map((child, i) => renderNode(child, i))}
          </HeadingTag>
        );
      }
      case 'paragraph':
        return (
          <p key={index} className="leading-relaxed text-foreground/90 mb-4">
            {node.children?.map((child, i) => renderNode(child, i))}
          </p>
        );
      case 'text':
        return <span key={index}>{node.text}</span>;
      case 'list': {
        const ListTag = node.listType === 'number' ? 'ol' : 'ul';
        return (
          <ListTag key={index} className={node.listType === 'number' ? 'list-decimal' : 'list-disc'}>
            {node.children?.map((child, i) => renderNode(child, i))}
          </ListTag>
        );
      }
      case 'listitem':
        return (
          <li key={index} className="ml-6 mb-2 text-foreground/90">
            {node.children?.map((child, i) => renderNode(child, i))}
          </li>
        );
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-6 text-foreground/80">
            {node.children?.map((child, i) => renderNode(child, i))}
          </blockquote>
        );
      case 'code':
        return (
          <code key={index} className="bg-muted px-1.5 py-0.5 rounded text-accent text-sm font-mono">
            {node.children?.map((child, i) => renderNode(child, i))}
          </code>
        );
      default:
        return null;
    }
  };

  // Fallback: content is plain HTML (e.g. from legacy data or test entries)
  if (isHtml) {
    return (
      <div
        className="prose-blog prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  if (!parsedContent) {
    return <div className="text-muted-foreground">Loading content...</div>;
  }

  return (
    <div className="prose-blog">
      {parsedContent.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
}