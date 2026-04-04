import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
} from 'lucide-react';

interface AnimationControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onStepChange: (step: number) => void;
}

const AnimationControls: React.FC<AnimationControlsProps> = ({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlayPause,
  onNext,
  onPrevious,
  onReset,
  onSpeedChange,
  onStepChange,
}) => {
  const speedOptions = [
    { value: 0.5, label: '0.5x' },
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 3, label: '3x' },
  ];

  return (
    <div className="bg-white border-t border-border p-4 space-y-4">
      {/* Main Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          title="重置"
          className="hover:bg-gray-100"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={currentStep === 0}
          title="上一步"
          className="hover:bg-gray-100"
        >
          <SkipBack className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          onClick={onPlayPause}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6"
          title={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              暂停
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              播放
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          title="下一步"
          className="hover:bg-gray-100"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Speed Control */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs font-semibold text-gray-600">播放速度:</span>
        <div className="flex gap-1">
          {speedOptions.map((option) => (
            <Button
              key={option.value}
              variant={speed === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSpeedChange(option.value)}
              className={`text-xs ${
                speed === option.value
                  ? 'bg-teal-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Timeline Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-600">
          <span>步骤 {currentStep + 1} / {totalSteps}</span>
          <span>{Math.round((currentStep / (totalSteps - 1)) * 100)}%</span>
        </div>
        <Slider
          value={[currentStep]}
          onValueChange={(value) => onStepChange(value[0])}
          min={0}
          max={totalSteps - 1}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AnimationControls;
