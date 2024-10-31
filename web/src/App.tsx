import React, { useState, useEffect } from 'react';
import { Lock, Car, Timer, LucideIcon } from 'lucide-react';
import { CircularProgress } from '@/components/CircularProgress';
import { LinearProgress } from '@/components/LinearProgress';
import { MinimalProgress } from '@/components/MinimalProgress';
import useNuiEvent from '@/hooks/useNuiEvent';
import { ProgressOptions } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  lockpicking: Lock,
  hotwiring: Car,
  processing: Timer,
};

const App: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState<ProgressOptions | null>(null);
  const [active, setActive] = useState(false);

  useNuiEvent('startProgress', (data: ProgressOptions) => {
    setCurrentAction(data);
    setActive(true);
    setProgress(0);
  });

  useNuiEvent('cancelProgress', () => {
    setActive(false);
    setProgress(0);
    setCurrentAction(null);
  });

  useEffect(() => {
    if (!active || !currentAction) return;

    const incrementAmount = (100 * 20) / currentAction.duration;
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + incrementAmount;
        if (next >= 100) {
          setActive(false);
          setCurrentAction(null);
          clearInterval(timer);
          fetch('https://b2-sleekprogress/progressComplete', {
            method: 'POST',
            body: JSON.stringify({}),
          });
          return 0;
        }
        return next;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [active, currentAction]);

  if (!active || !currentAction) return null;

  const ProgressComponent = (() => {
    switch (currentAction.type) {
      case 'circular':
        return CircularProgress;
      case 'linear':
        return LinearProgress;
      case 'minimal':
        return MinimalProgress;
      default:
        return MinimalProgress;
    }
  })();

  return (
    <ProgressComponent
      icon={iconMap[currentAction.label.toLowerCase()] || Timer}
      label={currentAction.label}
      progress={Math.min(Math.round(progress), 100)}
      style={currentAction.style}
    />
  );
};

export default App;