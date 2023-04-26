import { useCallback, useEffect, useRef } from 'react';

const useAutoResizeTextarea =() => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [resizeTextarea]);

  return { textareaRef, resizeTextarea };
}

export default useAutoResizeTextarea;
