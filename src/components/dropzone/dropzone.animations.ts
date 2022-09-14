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