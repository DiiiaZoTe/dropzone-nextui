import { keyframes } from "@nextui-org/react";

export const invalidShake = keyframes({
  '10%, 90%': {
    transform: 'translateX(-1px)',
  },
  '20%, 80%': {
    transform: 'translateX(2px)',
  },
  '30%, 50%, 70%': {
    transform: 'translateX(-4px)',
  },
  '40%, 60%': {
    transform: 'translateX(4px)',
  }
});


export const fadeIn = keyframes({
  "0%": {
    opacity: 0,
  },
  "60%": {
    opacity: 0.75,
  },
  "100%": {
    opacity: 1,
  },
});

export const fadeOut = keyframes({
  "0%": {
    opacity: 1,
  },
  "60%": {
    opacity: 0.25,
  },
  "100%": {
    opacity: 0,
  },
});

export const appearanceInFile = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.2)",
  },
  "60%": {
    opacity: 0.75,
    transform: "scale(1.2)",
  },
  "100%": {
    opacity: 1,
    transform: "scale(1)",
  },
});