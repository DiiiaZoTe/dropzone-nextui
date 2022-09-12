import { styled, cssFocusVisible } from "@nextui-org/react";
// import { motion } from 'framer-motion';
import { invalidShake, fadeIn } from "./dropzone.animations";
import { Text } from '@nextui-org/react';

/*
  ITEM_WIDTH = '$36' // = 8rem
  MAX_ITEMS = 4; // number of items to show before wrap
  ITEM_GAP = '$md'; // = 1rem
  DROPZONE_PADDING = '$md'; // = 1rem
  calculate the width like this:
  ITEM_WIDTH * MAX_ITEMS + ITEM_GAP * (MAX_ITEMS - 1) + DROPZONE_PADDING * 2
  = 9rem * 4 + 1rem * 3 + 1rem * 2 = 41rem
  add one rem for the border
  DROPZONE_WIDTH = '42rem';
  full = 100%
  lg = 4 items = 42rem (default)
  md = 3 items = 32rem
  sm = 2 items = 22rem
  xs = 1 item  = 12rem
*/
/** Width of a Preview Item = 9rem */
const ITEM_WIDTH = '$36'
/** Gap between Preview Items = 1rem */
const ITEM_GAP = '$md';
/** Padding of the dropzone = 1rem */
const DROPZONE_PADDING = '$md';

//! DROPZONE --------------------------------------------
/** Main dropzone Style */
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
      /** should the dropzone be animated? */
      animated: {
        true: {
          transition: 'all 0.3s ease-in-out',
          '&.nextui-dropzone--invalid-shake': {
            animation: `${invalidShake} 0.5s ease-in-out`,
          }
        }
      },
      /** should the dropzone be bordered */
      bordered: {
        true: {},
        false: {
          borderColor: 'transparent  !important',
          bw: '$normal',
          borderStyle: 'solid',
        }
      },
      /** various width of dropzone */
      width: {
        xs: {
          width: '12rem', // 1 item
        },
        sm: {
          width: '22rem', // 2 items
        },
        md: {
          width: '32rem', // 3 items
        },
        lg: {
          width: '42rem', // default // 4 items
        },
        full: {
          width: '100%',
        }
      },
      /** various colors of the dropzone used for the variant
       *  @default 'default'
       *  @notice this is the 'flat' variant
       */
      color: {
        default: {
          bg: '$accents0',
          color: '$accents7',
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
            color: '$primaryLightContrast',
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
            color: '$secondaryLightContrast',
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
            color: '$errorLightContrast',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$errorLightActive',
          },
        },
      },
      /** various variants of the dropzone
       *  @default 'flat'
       *  @notice solid and shadow have the same base.
       *  Shadow adds a border and has a transparent background for default color
       */
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
          shadow: '$md',
          '& .nextui-dropzone--Error': {
            bg: '$errorLight',
          },
        },
        shadow_flat: {
          shadow: '$md',
          '& .nextui-dropzone--Error': {
            bg: '$errorLight',
          },
        }
      },
      /** should the error border be displayed */
      showErrorBorder: {
        true: {
          borderColor: '$errorBorder !important',
          bw: '$normal',
          borderStyle: 'solid',
        }
      },
      /** various border weights of the dropzone
       *  @default 'normal'
       */
      borderWeight: {
        light: {},
        normal: {},
        bold: {},
        extrabold: {},
        black: {}
      },
      /** various border styles of the dropzone
       *  @default 'dashed'
       */
      borderStyle: {
        dashed: {},
        dotted: {},
        solid: {}
      },
      /** various border colors of the dropzone
       *  @default 'default'
       */
      borderColor: {
        default: {},
        primary: {},
        secondary: {},
        warning: {},
        success: {},
        error: {},
      },
      /** should the dropzone be disabled? */
      disabled: {
        true: {
          background: '$accents3 !important',
          color: '$accents8 !important',
          '& .nextui-dropzone--Preview-item': {
            bg: '$accents1 !important',
            color: '$text !important',
            shadow: 'none !important',
          },
          '& .nextui-dropzone--Preview-item-close': {
            bg: '$accents5 !important',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$accents0 !important',
          },
        }
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
            bg: '$primarySolidHover',
            color: '$primarySolidContrast',
            shadow: '$sm',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$primaryBorder',
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
            bg: '$primarySolidHover',
            color: '$primarySolidContrast',
            shadow: '$sm',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$primaryBorder',
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
            bg: '$secondarySolidHover',
            color: '$secondarySolidContrast',
            shadow: '$sm',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$secondaryBorder',
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
            bg: '$warningSolidHover',
            color: '$warningSolidContrast',
            shadow: '$sm',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$warningBorder',
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
            bg: '$successSolidHover',
            color: '$successSolidContrast',
            shadow: '$sm',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$successBorder',
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
            bg: '$errorSolidHover',
            color: '$errorSolidContrast',
            shadow: '$sm',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$errorBorder',
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
            color: '$text',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$accents1',
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
            bg: '$primarySolidHover',
            color: '$primarySolidContrast',
            shadow: '$sm',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$primaryBorder',
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
            bg: '$secondarySolidHover',
            color: '$secondarySolidContrast',
            shadow: '$sm',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$secondaryBorder',
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
            bg: '$warningSolidHover',
            color: '$warningSolidContrast',
            shadow: '$sm',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$warningBorder',
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
            bg: '$successSolidHover',
            color: '$successSolidContrast',
            shadow: '$sm',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$successBorder',
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
            bg: '$errorSolidHover',
            color: '$errorSolidContrast',
            shadow: '$sm',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$errorBorder',
          },
        }
      },
      //! shadow flat = flat with shadow (default color is transparent)
      // shadow_flat / color default
      {
        variant: 'shadow_flat',
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
      // shadow_flat / color primary
      {
        variant: 'shadow_flat',
        color: 'primary',
        css: {
          normalShadow: '$primaryShadow',
        },
      },
      // shadow / color secondary
      {
        variant: 'shadow_flat',
        color: 'secondary',
        css: {
          normalShadow: '$secondaryShadow',
        },
      },
      // shadow_flat / color warning
      {
        variant: 'shadow_flat',
        color: 'warning',
        css: {
          normalShadow: '$warningShadow',
        },
      },
      // shadow_flat / color success
      {
        variant: 'shadow_flat',
        color: 'success',
        css: {
          normalShadow: '$successShadow',
        },
      },
      // shadow_flat / color error
      {
        variant: 'shadow_flat',
        color: 'error',
        css: {
          normalShadow: '$errorShadow',
        },
      },
      //! border below
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
      // disabled border default
      {
        bordered: true,
        disabled: true,
        css: {
          borderColor: '$accents5 !important',
          borderStyle: 'dashed',
          bw: '$normal',
        }
      },
      // border style dashed
      {
        bordered: true,
        borderStyle: 'dashed',
        css: {
          borderStyle: 'dashed !important',
        }
      },
      // border style solid
      {
        bordered: true,
        borderStyle: 'solid',
        css: {
          borderStyle: 'solid !important',
        }
      },
      // border style dotted
      {
        bordered: true,
        borderStyle: 'dotted',
        css: {
          borderStyle: 'dotted !important',
        }
      },
      // border weight light
      {
        bordered: true,
        borderWeight: 'light',
        css: {
          bw: '$light !important',
        }
      },
      // border weight normal
      {
        bordered: true,
        borderWeight: 'normal',
        css: {
          bw: '$normal !important',
        }
      },
      // border weight bold
      {
        bordered: true,
        borderWeight: 'bold',
        css: {
          bw: '$bold !important',
        }
      },
      // border weight extrabold
      {
        bordered: true,
        borderWeight: 'extrabold',
        css: {
          bw: '$extrabold !important',
        }
      },
      // border weight black
      {
        bordered: true,
        borderWeight: 'black',
        css: {
          bw: '$black !important',
        }
      },
      // disabled and light
      {
        disabled: true,
        variant: 'light',
        css: {
          background: 'transparent !important',
          color: '$accents7 !important',
          '& .nextui-dropzone--Preview-item': {
            bg: '$accents2 !important',
            color: '$accents8 !important',
          },
          '& .nextui-dropzone--Preview-item-extension': {
            bg: '$accents1 !important',
          },
        }
      },
      // disabled and shadow
      {
        disabled: true,
        variant: 'shadow',
        css: {
          shadow: '$sm',
        }
      },
    ],
    '@motion': {
      transition: 'none'
    },
  },
  cssFocusVisible
);

//! DROPZONE STATUS ----------------------------------------------
/** Main Dropzone status style (Base,Accept,Reject) */
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
      },
    },
    spaceY: {
      above: {
        marginTop: '$lg',
      },
      below: {
        marginBottom: '$lg',
      },
      both: {
        marginTop: '$lg',
        marginBottom: '$lg',
      },
    },
  }
});

//! DROPZONE FULLSCREEN ----------------------------------------------
export const StyledFullscreen = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  opacity: 0,
  color: 'currentColor',
  variants: {
    visible: {
      true: {
        opacity: 1,
        pointerEvents: 'all',
      },
    },
    animated: {
      true: {
        transition: 'all 0.3s ease-in-out',
      },
    },
  },
  '@motion': {
    transition: 'none'
  },
});

//! DROPZONE PREVIEW / ITEM / REMOVE ----------------------------------------------
/** large default preview size = item width */
const IMAGE_PREVIEW_SIZE = ITEM_WIDTH;
/** medium preview size = 2/3 of item width */
const IMAGE_PREVIEW_SIZE_MD = '6rem';
/** small preview size = 1/3 of item width */
const IMAGE_PREVIEW_SIZE_SM = '3rem';

/** Main Dropzone.Preview style
 *  @notice
 *  Add defaultStyle prop to use the defaultStyle.
 *  This allows to use this as basic container for custom previews.
 */
export const StyledDropzonePreview = styled("div", {
  width: "100%",
  position: 'relative',
  variants: {
    defaultStyle: {
      true: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: `${ITEM_GAP}`,
      }
    },
    spaceY: {
      above: {
        marginTop: '$lg',
      },
      below: {
        marginBottom: '$lg',
      },
      both: {
        marginTop: '$lg',
        marginBottom: '$lg',
      },
    },
  }
});

/** Dropzone.Preview.Item style
 *  @notice
 *  Add defaultStyle prop to use the defaultStyle.
 *  This allows to use this as basic container for custom preview items.
 */
export const StyledDropzonePreviewItem = styled("div", {
  position: 'relative',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: `${ITEM_WIDTH}`,
  maxWidth: '100%',
  padding: "$xs",
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
        transition: 'all 0.3s ease-in-out',
      }
    },
    noWidthLimit: {
      true: {
        width: 'auto',
      }
    },
    size: {
      lg: {
        maxWidth: `${IMAGE_PREVIEW_SIZE}`,
        maxHeight: `${IMAGE_PREVIEW_SIZE}`,
      },
      md: {
        maxWidth: `${IMAGE_PREVIEW_SIZE_MD}`,
        maxHeight: `${IMAGE_PREVIEW_SIZE_MD}`,
        borderRadius: '$sm',
      },
      sm: {
        maxWidth: `${IMAGE_PREVIEW_SIZE_SM}`,
        maxHeight: `${IMAGE_PREVIEW_SIZE_SM}`,
        borderRadius: '$xs',
      },
    }
  },
  '@motion': {
    transition: 'none'
  },
});

/** Use to display preview image */
export const StyledPreviewImage = styled("img", {
  width: '100%',
  height: '100%',
  borderRadius: '$md',
  objectPosition: 'center',
  objectFit: 'cover',
  variants: {
    size: {
      lg: {
      },
      md: {
        borderRadius: '$sm',
      },
      sm: {
        borderRadius: '$xs',
      },
    },
  },
  '@motion': {
    transition: 'none'
  },
});

/** Used to display the file name in Preview Item */
export const TextFile = styled(Text, {
  width: '100%',
  textAlign: 'center',
  height: '100%',
  padding: '$xs',
  whiteSpace: 'nowrap',
  '@motion': {
    transition: 'none'
  },
});

/** Used to display the file extension in Preview Item */
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
  },
  '@motion': {
    transition: 'none'
  },
});

/** Size of the remove button of Preview Item */
const CLOSE_BUTTON_SIZE = '1.5rem';
/** Half of the size of the remove button of Preview Item */
const CLOSE_BUTTON_SIZE_HALF = '0.75rem';
/** Thickness of the remove button cross of Preview Item */
const CLOSE_BUTTON_THICKNESS = '0.12rem';
/** Half of the Thickness of the remove button cross of Preview Item */
const CLOSE_BUTTON_THICKNESS_HALF = '0.06rem';

/** Main button to remove PreviewItem */
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

/** Cross for the button remove of Preview Item */
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

/** Hidden span for accessibility purposes */
export const HiddenSpan = styled("span", {
  position: 'absolute',
  clip: 'rect(1px, 1px, 1px, 1px)',
  padding: '0',
  border: '0',
  height: '1px',
  width: '1px',
  overflow: 'hidden'
});

//! DROPZONE ERROR ----------------------------------------------

/** Unstyled error container */
export const UnstyledErrorDiv = styled('div', {
  position: 'relative',
  width: '100%',
  variants: {
    spaceY: {
      above: {
        marginTop: '$lg',
      },
      below: {
        marginBottom: '$lg',
      },
      both: {
        marginTop: '$lg',
        marginBottom: '$lg',
      },
    },
  }
});

/** Container holding the error */
export const StyledErrorBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  borderRadius: '$md',
  padding: '$md',
  margin: 'auto',
  '@motion': {
    transition: 'none'
  },
});

/** Container for error files */
export const StyledErrorFiles = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%',
});