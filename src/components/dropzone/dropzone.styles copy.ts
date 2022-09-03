import { styled, cssFocusVisible } from "@nextui-org/react";
// import { motion } from 'framer-motion';
import { invalidShake, fadeIn } from "./dropzone.animations";
import { Text } from '@nextui-org/react';

// ITEM_WIDTH = '$32' // = 8rem
// MAX_ITEMS = 4; // number of items to show before wrap
// ITEM_GAP = '$md'; // = 1rem
// DROPZONE_PADDING = '$md'; // = 1rem
// calculate the width like this:
// ITEM_WIDTH * MAX_ITEMS + ITEM_GAP * (MAX_ITEMS - 1) + DROPZONE_PADDING * 2
// = 8rem * 4 + 1rem * 3 + 1rem * 2 = 37rem
// DROPZONE_WIDTH = '37rem';
// add one rem for the border
// full = 100%
// lg = 4 items = 38rem (default)
// md = 3 items = 29rem
// sm = 2 items = 20rem
// xs = 1 item = 11rem
const ITEM_WIDTH = '$36' // = 9rem
const ITEM_GAP = '$md'; // = 1rem
const DROPZONE_PADDING = '$md'; // = 1rem
// todo: border takes 5 pixels so add 5px*2 to the width or borderwidth*2

export const StyledDropzone = styled('div',
  {
    position: 'relative',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: `${DROPZONE_PADDING}`,
    minWidth: '$48',
    maxWidth: '100%',
    height: 'fit-content',
    cursor: "pointer",
    borderRadius: '$md',
    variants: {
      animated: {
        true: {
          transition: 'all 0.3s ease-in-out',
          '&.nextui-dropzone--invalid-shake': {
            animation: `${invalidShake} 0.5s ease-in-out`,
          }
        }
      },
      bordered: {
        true: {},
        false: {
          borderColor: 'transparent  !important',
          bw: '$normal',
          borderStyle: 'solid',
        }
      },
      width: {
        xs: {
          width: '101rem', // 1 item
        },
        sm: {
          width: '20rem', // 2 items
        },
        md: {
          width: '29rem', // 3 items
        },
        lg: {
          width: '38rem', // default // 4 items
        },
        full: {
          width: '100%',
        }
      },
      color: { //flat is default
        default: {
          bg: '$accents0',
          color: '$accents6',
          borderColor: '$accents5',
          '& .nextui-dropzone--Preview-item': {
            bg: '$accents2',
            color: '$text',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$accents4'
          },
        },
        primary: {
          bg: '$primaryLight',
          color: '$primaryLightContrast',
          borderColor: '$primaryBorder',
          '& .nextui-dropzone--Preview-item': {
            bg: '$primaryLightHover',
            color: '$primaryLightContrast'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$primaryLightActive',
          },
        },
        secondary: {
          bg: '$secondaryLight',
          color: '$secondaryLightContrast',
          borderColor: '$secondaryBorder',
          '& .nextui-dropzone--Preview-item': {
            bg: '$secondaryLightHover',
            color: '$secondaryLightContrast'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$secondaryLightActive',
          },
        },
        warning: {
          bg: '$warningLight',
          color: '$warningLightContrast',
          borderColor: '$warningBorder',
          '& .nextui-dropzone--Preview-item': {
            bg: '$warningLightHover',
            color: '$warningLightContrast'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$warningLightActive',
          },
        },
        success: {
          bg: '$successLight',
          color: '$successLightContrast',
          '& .nextui-dropzone--Preview-item': {
            bg: '$successLightHover',
            color: '$successLightContrast'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$successLightActive',
          },
        },
        error: {
          bg: '$errorLight',
          color: '$errorLightContrast',
          '& .nextui-dropzone--Preview-item': {
            bg: '$errorLightHover',
            color: '$errorLightContrast'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$errorLightActive',
          },
        },
      },
      variant: {
        flat: {
          '& .nextui-dropzone--Error': {
            bg: '$errorLight',
          }
        },
        light: {},
        solid: {
          '& .nextui-dropzone--Error': {
            bg: '$errorLight',
          }
        },
        shadow: {
          shadow: '$sm',
          '& .nextui-dropzone--Error': {
            bg: '$errorLight',
          },
        }
      },
      borderWeight: {
        light: {},
        normal: {},
        bold: {},
        extrabold: {},
        black: {}
      },
      borderStyle: {
        dashed: {},
        dotted: {},
        solid: {}
      },
      borderColor: {
        default: {},
        primary: {},
        secondary: {},
        warning: {},
        success: {},
        error: {},
      },
    },
    compoundVariants: [
      // light / color default
      {
        variant: 'light',
        color: 'default',
        css: {
          color: '$text',
          bg: 'transparent',
          '& .nextui-dropzone--Preview-item': {
            bg: '$accents0',
            color: '$text'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$accents1',
          },
        }
      },
      // light / color primary
      {
        variant: 'light',
        color: 'primary',
        css: {
          color: '$primary',
          bg: 'transparent',
          '& .nextui-dropzone--Preview-item': {
            bg: '$primaryLight',
            color: '$primaryLightContrast'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$primaryLightHover',
          },
        }
      },
      // light / color secondary
      {
        variant: 'light',
        color: 'secondary',
        css: {
          color: '$secondary',
          bg: 'transparent',
          '& .nextui-dropzone--Preview-item': {
            bg: '$secondaryLight',
            color: '$secondaryLightContrast'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$secondaryLightHover',
          },
        }
      },
      // light / color warning
      {
        variant: 'light',
        color: 'warning',
        css: {
          color: '$warning',
          bg: 'transparent',
          '& .nextui-dropzone--Preview-item': {
            bg: '$warningLight',
            color: '$warningLightContrast'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$warningLightHover',
          },
        }
      },
      // light / color success
      {
        variant: 'light',
        color: 'success',
        css: {
          color: '$success',
          bg: 'transparent',
          '& .nextui-dropzone--Preview-item': {
            bg: '$successLight',
            color: '$successLightContrast'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$successLightHover',
          },
        }
      },
      // light / color error
      {
        variant: 'light',
        color: 'error',
        css: {
          color: '$error',
          bg: 'transparent',
          '& .nextui-dropzone--Preview-item': {
            bg: '$errorLight',
            color: '$errorLightContrast'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$errorLightHover',
          },
        }
      },
      // solid / color default
      {
        variant: 'solid',
        color: 'default',
        css: {
          bg: '$primary',
          color: '$primarySolidContrast',
          '& .nextui-dropzone--Preview-item': {
            bg: '$primarySolidContrast',
            color: '$primary'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$primaryLight',
          },
        }
      },
      // solid / color primary
      {
        variant: 'solid',
        color: 'primary',
        css: {
          bg: '$primary',
          color: '$primarySolidContrast',
          '& .nextui-dropzone--Preview-item': {
            bg: '$primarySolidContrast',
            color: '$primary'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$primaryLight',
          },
        }
      },
      // solid / color secondary
      {
        variant: 'solid',
        color: 'secondary',
        css: {
          bg: '$secondary',
          color: '$secondarySolidContrast',
          '& .nextui-dropzone--Preview-item': {
            bg: '$secondarySolidContrast',
            color: '$secondary'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$secondaryLight',
          },
        }
      },
      // solid / color warning
      {
        variant: 'solid',
        color: 'warning',
        css: {
          bg: '$warning',
          color: '$warningSolidContrast',
          '& .nextui-dropzone--Preview-item': {
            bg: '$warningSolidContrast',
            color: '$warning'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$warningLight',
          },
        }
      },
      // solid / color success
      {
        variant: 'solid',
        color: 'success',
        css: {
          bg: '$success',
          color: '$successSolidContrast',
          '& .nextui-dropzone--Preview-item': {
            bg: '$successSolidContrast',
            color: '$success'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$successLight',
          },
        }
      },
      // solid / color error
      {
        variant: 'solid',
        color: 'error',
        css: {
          bg: '$error',
          color: '$errorSolidContrast',
          '& .nextui-dropzone--Preview-item': {
            bg: '$errorSolidContrast',
            color: '$error'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$errorLight',
          },
        }
      },
      //! solid and shadow have the same base except for default
      // shadow / color default
      {
        variant: 'shadow',
        color: 'default',
        css: {
          bg: 'transparent',
          color: '$text',
          '& .nextui-dropzone--Preview-item': {
            bg: '$accents0',
            color: '$text'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$primaryLight',
          },
        }
      },
      // shadow / color primary
      {
        variant: 'shadow',
        color: 'primary',
        css: {
          bg: '$primary',
          color: '$primarySolidContrast',
          normalShadow: '$primaryShadow',
          '& .nextui-dropzone--Preview-item': {
            bg: '$primarySolidContrast',
            color: '$primary'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$primaryLight',
          },
        }
      },
      // shadow / color secondary
      {
        variant: 'shadow',
        color: 'secondary',
        css: {
          bg: '$secondary',
          color: '$secondarySolidContrast',
          normalShadow: '$secondaryShadow',
          '& .nextui-dropzone--Preview-item': {
            bg: '$secondarySolidContrast',
            color: '$secondary'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$secondaryLight',
          },
        }
      },
      // shadow / color warning
      {
        variant: 'shadow',
        color: 'warning',
        css: {
          bg: '$warning',
          color: '$warningSolidContrast',
          normalShadow: '$warningShadow',
          '& .nextui-dropzone--Preview-item': {
            bg: '$warningSolidContrast',
            color: '$warning'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$warningLight',
          },
        }
      },
      // shadow / color success
      {
        variant: 'shadow',
        color: 'success',
        css: {
          bg: '$success',
          color: '$successSolidContrast',
          normalShadow: '$successShadow',
          '& .nextui-dropzone--Preview-item': {
            bg: '$successSolidContrast',
            color: '$success'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$successLight',
          },
        }
      },
      // shadow / color error
      {
        variant: 'shadow',
        color: 'error',
        css: {
          bg: '$error',
          color: '$errorSolidContrast',
          normalShadow: '$errorShadow',
          '& .nextui-dropzone--Preview-item': {
            bg: '$errorSolidContrast',
            color: '$error'
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$errorLight',
          },
        }
      },
      // default border color
      {
        bordered: true,
        borderColor: 'default',
        css: {
          borderColor: '$accents5',
        }
      },
      // primary border color
      {
        bordered: true,
        borderColor: 'primary',
        css: {
          borderColor: '$primaryBorder',
        }
      },
      // secondary border color
      {
        bordered: true,
        borderColor: 'secondary',
        css: {
          borderColor: '$secondaryBorder',
        }
      },
      // warning border color
      {
        bordered: true,
        borderColor: 'warning',
        css: {
          borderColor: '$warningBorder',
        }
      },
      // success border color
      {
        bordered: true,
        borderColor: 'success',
        css: {
          borderColor: '$successBorder',
        }
      },
      // error border color
      {
        bordered: true,
        borderColor: 'error',
        css: {
          borderColor: '$errorBorder',
        }
      },
      // border style dashed
      {
        bordered: true,
        borderStyle: 'dashed',
        css: {
          borderStyle: 'dashed',
        }
      },
      // border style solid
      {
        bordered: true,
        borderStyle: 'solid',
        css: {
          borderStyle: 'solid',
        }
      },
      // border style dotted
      {
        bordered: true,
        borderStyle: 'dotted',
        css: {
          borderStyle: 'dotted',
        }
      },
      // border weight light
      {
        bordered: true,
        borderWeight: 'light',
        css: {
          bw: '$light',
        }
      },
      // border weight normal
      {
        bordered: true,
        borderWeight: 'normal',
        css: {
          bw: '$normal',
        }
      },
      // border weight bold
      {
        bordered: true,
        borderWeight: 'bold',
        css: {
          bw: '$bold',
        }
      },
      // border weight extrabold
      {
        bordered: true,
        borderWeight: 'extrabold',
        css: {
          bw: '$extrabold',
        }
      },
      // border weight black
      {
        bordered: true,
        borderWeight: 'black',
        css: {
          bw: '$black',
        }
      },
    ],
    '@motion': {
      transition: 'none'
    },
  },
  {
    variants: {
      // disabled and error here to override other styles
      showErrorBorder: {
        true: {
          borderColor: '$errorBorder !important',
          bw: '$normal',
          borderStyle: 'solid',
        }
      },
      disabled: {
        true: {
          background: '$accents3',
          color: '$accents8',
          '& .nextui-dropzone--Preview-item': {
            bg: '$accents1',
            color: '$text',
          },
          '& .nextui-dropzone--Preview-item-close': {
            bg: '$accents5',
          },

        }
      },
      variant: {
        light: {}
      },
      bordered: {
        true: {}
      },
      borderStyle: {
        dashed: {},
        dotted: {},
        solid: {}
      },
    },
    compoundVariants: [
      {
        disabled: true,
        variant: 'light',
        css: {
          background: 'transparent !important',
          color: '$accents7 !important',
          '& .nextui-dropzone--Preview-item': {
            bg: '$accents2',
            color: '$accents8',
          },
        }
      },
      {
        bordered: true,
        disabled: true,
        borderStyle: 'dashed',
        css: {
          borderColor: '$accents5',
          borderStyle: 'dashed',
          bw: '$normal',
        }
      },
      {
        bordered: true,
        disabled: true,
        borderStyle: 'solid',
        css: {
          borderColor: '$accents5',
          borderStyle: 'solid',
          bw: '$normal',
        }
      },
      {
        bordered: true,
        disabled: true,
        borderStyle: 'dotted',
        css: {
          borderColor: '$accents5',
          borderStyle: 'dotted',
          bw: '$normal',
        }
      },
    ]
  },
  cssFocusVisible
);

export const StyledDropzoneStatus = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%",
  height: 'auto',
  variants: {
    animated: {
      true: {
        animation: `${fadeIn} 0.4s ease-in-out`,
      }
    }
  }
});

export const StyledDropzonePreview = styled("div", {
  width: "100%",
  position: 'relative',
  variants: {
    defaultStyle: {
      true: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${ITEM_WIDTH}, max-content))`,
        justifyContent: 'center',
        alignItems: 'center',
        gap: `${ITEM_GAP}`,
      }
    },
    hasItems: {
      true: {
        marginTop: '$lg',
      },
    },
  }
});

export const StyledDropzonePreviewItem = styled("div", {
  position: 'relative',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: `${ITEM_WIDTH}`,
  maxWidth: '100%',
  padding: "$xs",
  // marginLeft: '$sm',
  // marginRight: '$sm',
  fontSize: "$sm",
  borderRadius: '$md',
  variants: {
    defaultStyle: {
      true: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        padding: 0,
      }
    },
    animated: {
      true: {
        transition: "all 0.3s ease-in-out",
        // animation: `${appearanceInFile} 0.25s ease-out`,
      },
      false: {}
    }
    //TODO: add variants for background and color and border/nobackground
  },
  '@motion': {
    transition: 'none'
  },
});

export const TextFile = styled(Text, {
  width: '100%',
  textAlign: 'center',
  height: '100%',
  padding: '$xs',
});

export const TextExtension = styled(Text, {
  padding: '$xs',
  height: '100%',
  borderRadius: ' 0 $md $md 0',
  variants: {
    animated: {
      true: {
        transition: "background 0.3s ease-in-out",
      }
    }
  }
});

const CLOSE_BUTTON_SIZE = '1.6em';
const CLOSE_BUTTON_SIZE_HALF = '0.8em';
const CLOSE_BUTTON_THICKNESS = '0.12em';
const CLOSE_BUTTON_THICKNESS_HALF = '0.06em';

export const StyledButtonClose = styled("button",
  {
    position: 'absolute',
    top: `-${CLOSE_BUTTON_SIZE_HALF}`,
    right: `-${CLOSE_BUTTON_SIZE_HALF}`,
    background: '$error',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    borderRadius: '50%',
    border: 'none',
    variants: {
      animated: {
        true: {
          transition: "all 0.3s ease-in-out",
          '&:hover .close': {
            transform: 'rotate(90deg)',
          }
        }
      },
    },
    '@motion': {
      transition: 'none'
    },
  },
  cssFocusVisible
);

export const StyledCross = styled("span", {
  width: `${CLOSE_BUTTON_SIZE}`,
  height: `${CLOSE_BUTTON_SIZE}`,
  bordeRadius: '50%',
  background: 'transparent',
  '&::before, &::after': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `${CLOSE_BUTTON_SIZE_HALF}`,
    height: `${CLOSE_BUTTON_THICKNESS}`,
    borderRadius: `${CLOSE_BUTTON_THICKNESS_HALF}`,
    transformOrigin: 'center',
    background: 'white',
    content: '',
  },
  '&::before': {
    transform: 'translate(-50%, -50%) rotate(45deg)',
  },
  '&::after': {
    transform: 'translate(-50%, -50%) rotate(-45deg)',
  },
  variants: {
    animated: {
      true: {
        transition: 'all 0.3s ease-in-out',
      }
    }
  },
  '@motion': {
    transition: 'none'
  },
});

export const HiddenSpan = styled("span", {
  position: 'absolute',
  clip: 'rect(1px, 1px, 1px, 1px)',
  padding: '0',
  border: '0',
  height: '1px',
  width: '1px',
  overflow: 'hidden'
});
