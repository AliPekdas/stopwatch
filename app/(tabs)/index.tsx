import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Vibration } from 'react-native';

export default function HomeScreen() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const startTimeRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      const start = Date.now() - time;
      startTimeRef.current = start;

      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running]);

const handleStart = () => {
  Vibration.vibrate(50); // vibrate for 50ms
  setRunning(true);
  setPaused(false);
};

const handleStop = () => {
  Vibration.vibrate(50);
  setRunning(false);
  setPaused(true);
};

const handleResume = () => {
  Vibration.vibrate(50);
  setRunning(true);
  setPaused(false);
};

const handleReset = () => {
  Vibration.vibrate(50);
  setRunning(false);
  setPaused(false);
  setTime(0);
};

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const centiseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle_in} />
      <View style={styles.circle_out} />
      <Text style={styles.circleText}>{formatTime(time)}</Text>

      {!running && !paused && (
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}

      {running && (
        <TouchableOpacity style={styles.button} onPress={handleStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      )}

      {!running && paused && (
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.sideButton} onPress={handleResume}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sideButton} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 75,
  },
  circle_out: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 8,
    borderColor: '#209882ff',
    position: 'absolute',
    zIndex: 0,
    elevation: 20,
  },
  circle_in:{
    width: 224,
    height: 224,
    borderRadius: 112,
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: 1,
  },
  circleText:{
    color: '#fff',
    fontSize: 46,
    position: 'absolute',
    zIndex: 2,
  },
  button: {
    top: 325,
    width: 175,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttons: {
    flexDirection: 'row',
    top: 325,
    gap: 16,
  },
  sideButton: {
    width: 150,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
