import { styled, cssFocusVisible } from "@nextui-org/react";
// import { motion } from 'framer-motion';
import { invalidShake, fadeIn, appearanceInFile } from "./dropzone.animations";

const ITEM_WIDTH = '$32'; // = 8rem
// const MAX_ITEMS = 4; // number of items to show before wrap
const ITEM_GAP = '$md'; // = 1rem
const DROPZONE_PADDING = '$md'; // = 1rem
// calculate the width like this:
// ITEM_WIDTH * MAX_ITEMS + ITEM_GAP * (MAX_ITEMS - 1) + DROPZONE_PADDING * 2
// = 8rem * 4 + 1rem * 3 + 1rem * 2 = 37rem
const DROPZONE_WIDTH = '37rem';
const ITEM_BACKGROUND = 'rgba(0, 0, 0, 0.05)';

export const StyledDropzone = styled('div',
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: `${DROPZONE_PADDING}`,
    minWidth: '$48',
    width: `${DROPZONE_WIDTH}`,
    maxWidth: '100%',
    minHeight: '100%',
    height: "100%",
    cursor: "pointer",
    borderRadius: '$lg',
    overflow: "auto",
    background: '$accents1',
    color: '$accents7',
    '&[data-base] .nextui-dropzone--Preview-item': {
      background: `${ITEM_BACKGROUND}`,
      color: '$text'
    },
    '&[data-accept] .nextui-dropzone--Preview-item': {
      background: `${ITEM_BACKGROUND}`,
      color: '$successLightContrast'
    },
    '&[data-reject] .nextui-dropzone--Preview-item': {
      background: `${ITEM_BACKGROUND}`,
      color: '$errorLightContrast'
    },
    variants: {
      animated: {
        true: {
          transition: 'all 0.3s ease-in-out',
          '&.nextui-dropzone--invalid-shake': {
            animation: `${invalidShake} 0.5s ease-in-out`,
          }
        }
      },
      // background prop applied to dropzone component
      // use default if nothing is provided
      mainBackground: {
        default: {
          '&[data-base]': {
            background: '$accents0',
          },
          '&[data-accept]': {
            background: '$successLight',
          },
          '&[data-reject]': {
            background: '$errorLight',
          },
        }, // default already set
        primary: {
          '&[data-base]': {
            background: '$primaryLight',
          },
          '&[data-accept]': {
            background: '$successLight',
          },
          '&[data-reject]': {
            background: '$errorLight',
          },
          '&[data-base] .nextui-dropzone--Preview-item': {
            background: `${ITEM_BACKGROUND}`,
          },
        },
        secondary: {
          '&[data-base]': {
            background: '$secondaryLight',
          },
          '&[data-accept]': {
            background: '$successLight',
          },
          '&[data-reject]': {
            background: '$errorLight',
          },
          '&[data-base] .nextui-dropzone--Preview-item': {
            background: `${ITEM_BACKGROUND}`,
          },
        },
        transparent: {
          '&[data-base]': {
            background: 'transparent',
          },
          '&[data-accept]': {
            background: 'transparent',
          },
          '&[data-reject]': {
            background: 'transparent',
          },
        },
        glass: {
          backdropFilter: 'saturate(180%) blur(10px)',
          '&[data-base], &[data-accept], &[data-reject]': {
            background: 'transparent',
          },
          '&[data-base] .nextui-dropzone--Preview-item': {
            backdropFilter: 'saturate(180%) blur(10px)',
            background: '#88888840',
          },
          '&[data-accept] .nextui-dropzone--Preview-item': {
            backdropFilter: 'saturate(180%) blur(10px)',
            background: '#17C96460',
          },
          '&[data-reject] .nextui-dropzone--Preview-item': {
            backdropFilter: 'saturate(180%) blur(10px)',
            background: '#F3126040',
          },
        },
      },
      // color prop applied to dropzone component
      // use default if nothing is provided
      mainTextColor: {
        default: {
          '&[data-base]': {
            color: '$text',
          },
          '&[data-accept]': {
            color: '$successLightContrast'
          },
          '&[data-reject]': {
            color: '$errorLightContrast'
          },
        }, // default already set
        primary: {
          '&[data-base], &[data-base] .nextui-dropzone--Preview-item': {
            color: '$primaryLightContrast',
          },
          '&[data-accept]': {
            color: '$successLightContrast',
          },
          '&[data-reject]': {
            color: '$errorLightContrast',
          },
        },
        secondary: {
          '&[data-base], &[data-base] .nextui-dropzone--Preview-item': {
            color: '$secondaryLightContrast',
          },
          '&[data-accept]': {
            color: '$successLightContrast',
          },
          '&[data-reject]': {
            color: '$errorLightContrast',
          },
        },
      },
      // border props applied to dropzone component
      // use default/dashed/normal if nothing is provided
      bordered: {
        true: {},
        false: {}
      },
      mainBorderColor: {
        default: {},
        primary: {},
        secondary: {},
      },
      mainBorderStyle: {
        dashed: {},
        solid: {},
        dotted: {},
      },
      mainBorderWeight: {
        light: {},
        normal: {},
        bold: {},
        extrabold: {},
        black: {}
      },
      //--------------------------------------
    },
    compoundVariants: [
      // below set bordered true compound with color, style, weight
      // default border color
      {
        bordered: true,
        mainBorderColor: 'default',
        css: {
          '&[data-base]': {
            borderColor: '$accents5',
          },
          '&[data-accept]': {
            borderColor: '$successBorder',
          },
          '&[data-reject]': {
            borderColor: '$errorBorder',
          },
        }
      },
      // primary border color
      {
        bordered: true,
        mainBorderColor: 'primary',
        css: {
          '&[data-base]': {
            borderColor: '$primaryBorder',
          },
          '&[data-accept]': {
            borderColor: '$successBorder',
          },
          '&[data-reject]': {
            borderColor: '$errorBorder',
          },
        }
      },
      // default secondary color
      {
        bordered: true,
        mainBorderColor: 'secondary',
        css: {
          '&[data-base]': {
            borderColor: '$secondaryBorder',
          },
          '&[data-accept]': {
            borderColor: '$successBorder',
          },
          '&[data-reject]': {
            borderColor: '$errorBorder',
          },
        }
      },
      // border style dashed
      {
        bordered: true,
        mainBorderStyle: 'dashed',
        css: {
          borderStyle: 'dashed',
        }
      },
      // border style solid
      {
        bordered: true,
        mainBorderStyle: 'solid',
        css: {
          borderStyle: 'solid',
        }
      },
      // border style dotted
      {
        bordered: true,
        mainBorderStyle: 'dotted',
        css: {
          borderStyle: 'dotted',
        }
      },
      // border weight light
      {
        bordered: true,
        mainBorderWeight: 'light',
        css: {
          bw: '$light',
        }
      },
      // border weight normal
      {
        bordered: true,
        mainBorderWeight: 'normal',
        css: {
          bw: '$normal',
        }
      },
      // border weight bold
      {
        bordered: true,
        mainBorderWeight: 'bold',
        css: {
          bw: '$bold',
        }
      },
      // border weight extrabold
      {
        bordered: true,
        mainBorderWeight: 'extrabold',
        css: {
          bw: '$extrabold',
        }
      },
      // border weight black
      {
        bordered: true,
        mainBorderWeight: 'black',
        css: {
          bw: '$black',
        }
      },
    ],
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
        animation: `${fadeIn} 0.4s ease-out`,
      }
    }
  }
});

export const StyledDropzonePreview = styled("div", {
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(${ITEM_WIDTH}, max-content))`,
  justifyContent: 'center',
  gap: `${ITEM_GAP}`,
  width: "100%",
  height: 'auto',
  marginTop: '$sm',
});

export const StyledDropzonePreviewItem = styled("div", {
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
  borderRadius: '$lg',
  variants: {
    animated: {
      true: {
        transition: "all 0.3s ease-in-out",
        animation: `${appearanceInFile} 0.25s ease-out`,
      }
    }
    //TODO: add variants for background and color and border/nobackground
  }
});
