"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

/**
 * Procedural sound design — no audio files. A quiet evolving drone built from
 * detuned oscillators through a slowly-sweeping low-pass filter, plus a soft
 * tone whenever the journey enters a new domain. The AudioContext is only
 * created on the first un-mute (a user gesture), so autoplay policies are met.
 */
export default function SoundManager() {
  const muted = useStore((s) => s.muted);
  const active = useStore((s) => s.activeDomain);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  const ensure = () => {
    if (ctxRef.current) return ctxRef.current;
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 600;
    filter.Q.value = 5;
    filter.connect(master);

    // low, detuned drone stack
    [55, 82.4, 110, 165].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? "sine" : "triangle";
      o.frequency.value = f;
      o.detune.value = (i - 1.5) * 4;
      const g = ctx.createGain();
      g.gain.value = 0.12 / (i + 1);
      o.connect(g);
      g.connect(filter);
      o.start();
    });

    // slow filter sweep for movement
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 240;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    ctxRef.current = ctx;
    masterRef.current = master;
    return ctx;
  };

  useEffect(() => {
    const ctx = ctxRef.current;
    if (muted) {
      if (ctx && masterRef.current) {
        masterRef.current.gain.cancelScheduledValues(ctx.currentTime);
        masterRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      }
      return;
    }
    const c = ensure();
    void c.resume();
    const m = masterRef.current;
    if (m) {
      m.gain.cancelScheduledValues(c.currentTime);
      m.gain.linearRampToValueAtTime(0.05, c.currentTime + 1.2);
    }
  }, [muted]);

  // soft tone on domain change
  useEffect(() => {
    const ctx = ctxRef.current;
    if (muted || active < 0 || !ctx || !masterRef.current) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 330 + active * 70;
    g.gain.value = 0;
    o.connect(g);
    g.connect(masterRef.current);
    const now = ctx.currentTime;
    g.gain.linearRampToValueAtTime(0.05, now + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    o.start(now);
    o.stop(now + 0.65);
  }, [active, muted]);

  useEffect(() => {
    return () => {
      void ctxRef.current?.close();
    };
  }, []);

  return null;
}
