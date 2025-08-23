import { type FC, useState } from 'react';

interface IExpandableTextProps {
  text: string;
  maxSentences?: number;
  className?: string;
}

export const ExpandableText: FC<IExpandableTextProps> = ({
  text,
  maxSentences = 2,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split text into sentences
  const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [text];

  // Determine if text needs truncation
  const needsTruncation = sentences.length > maxSentences;

  // Get truncated text
  const truncatedText = needsTruncation
    ? sentences.slice(0, maxSentences).join(' ').trim()
    : text;

  const displayText = isExpanded ? text : truncatedText;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`p-5 border-1 border-gray-200 rounded-lg relative ${className}`}>
      <p className='mb-2 mt-1 text-justify text-base leading-relaxed'>
        {displayText}
        {needsTruncation && !isExpanded && '..'}
      </p>
      
      {needsTruncation && (
        <button 
          onClick={toggleExpanded}
          className="absolute bottom-1 right-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 p-3 rounded-full transition-colors duration-200"
          title={isExpanded ? 'Show less' : 'Show more'}
        >
          {isExpanded ? (
            // Collapse/Up arrow icon
            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            // Expand/Down arrow icon
            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};
