import { useEffect, useRef } from 'react';
import { NuiMessage } from '../types';

const useNuiEvent = (action: string, handler: (data: any) => void) => {
  const savedHandler = useRef<(data: any) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: MessageEvent<NuiMessage>) => {
      const { action: eventAction, data } = event.data;

      if (savedHandler.current && action === eventAction) {
        savedHandler.current(data);
      }
    };

    window.addEventListener('message', eventListener);
    return () => window.removeEventListener('message', eventListener);
  }, [action]);
};

export default useNuiEvent;