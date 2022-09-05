import Head from 'next/head'
import { useTheme as useNextTheme } from 'next-themes'
import { Spacer, Button, Text, styled, Container, useTheme, Switch } from '@nextui-org/react'
import Dropzone, { getBytes } from '@components/dropzone'
import { useEffect, useRef, useState } from 'react'
import { Error, File, Upload } from '@utils/icons/dropzone'

const Box = styled('div', {})
const Box2 = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: 'auto',
  flexWrap: 'wrap',
})

export default function Home() {

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  const colors = ['default', 'primary', 'secondary', 'warning'];
  const [color, setColor] = useState(colors[0] as any);

  const variants = ['flat', 'light', 'solid', 'shadow'];
  const [variant, setVariant] = useState(variants[0] as any);

  const [disabled, setDisabled] = useState(false);

  const [bordered, setBordered] = useState(false);
  const borderColors = [undefined, 'default', 'primary', 'secondary', 'warning'];
  const [borderColor, setBorderColor] = useState(borderColors[0] as any);
  const borderStyles = [undefined, 'dashed', 'solid', 'dotted'];
  const [borderStyle, setBorderStyle] = useState(borderStyles[0] as any);
  const borderWeights = [undefined, 'light', 'normal', 'bold', 'extrabold', 'black'];
  const [borderWeight, setBorderWeight] = useState(borderWeights[0] as any);

  const [files, setFiles] = useState([] as File[]);
  const openRef = useRef<() => void>(null);
  useEffect(() => {
    console.log('files', files);
  }, [files]);

  return (
    <Box css={{ p: '$8' }}>
      <Head>
        <title>Dropzone test with Nextui</title>
      </Head>
      <Dropzone
        css={{ paddingTop: '$16', paddingBottom: '$16' }}
        color={color} variant={variant} disabled={disabled}
        bordered={bordered} borderColor={borderColor} borderWeight={borderWeight} borderStyle={borderStyle}
        files={files} setFiles={setFiles}
        width='sm'
        maxSize={getBytes(400, 'KB')} maxFiles={4}
        openRef={openRef} accept={{ 'image/*': [] }}
      >
        <Dropzone.Base>
          <Container css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <File />
            <Text color='currentColor' css={{ textAlign: 'center' }}>Drop files or click to select</Text>
          </Container>
        </Dropzone.Base>
        <Dropzone.Accept >
          <Container css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Upload />
            <Text color='currentColor' css={{ textAlign: 'center' }}>Release to select files</Text>
          </Container>
        </Dropzone.Accept>
        <Dropzone.Reject >
          <Container css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Error />
            <Text color='currentColor' css={{ textAlign: 'center' }}>Invalid files, please try again</Text>
          </Container>
        </Dropzone.Reject>
        <Dropzone.Preview />
        {/* <Dropzone.Preview>
          {
            files.map((file, index) => {
              return (
                <Dropzone.Item file={file} key={file.name}>
                  {file.name}
                </Dropzone.Item>
              );
            })
          }
        </Dropzone.Preview> */}
      </Dropzone >
      <Spacer y={1} />
      <Button onPress={() => openRef.current?.()}>
        Click me to add file
      </Button>
      <Spacer y={1} />
      <Button
        onPress={() => setFiles([])}>
        remove all files
      </Button>
      <Spacer y={1} />
      <Box2>
        <Text>The current theme is: {type}</Text>
        <Spacer x={0.5} />
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
      </Box2>
      <Spacer y={1} />
      <Text>Color</Text>
      <Box2>
        <Button css={{ minWidth: 'auto' }} onPress={() => setColor(colors[(colors.indexOf(color) - 1 + colors.length) % colors.length])}>&lt;</Button>
        <Spacer x={0.5} />
        <Text css={{ minWidth: '$20', textAlign: 'center' }}>{color}</Text>
        <Spacer x={0.5} />
        <Button css={{ minWidth: 'auto' }} onPress={() => setColor(colors[(colors.indexOf(color) + 1) % colors.length])}>&gt;</Button>
      </Box2>
      <Spacer y={1} />
      <Text>variant</Text>
      <Box2>
        <Button css={{ minWidth: 'auto' }} onPress={() => setVariant(variants[(variants.indexOf(variant) - 1 + variants.length) % variants.length])}>&lt;</Button>
        <Spacer x={0.5} />
        <Text css={{ minWidth: '$20', textAlign: 'center' }}>{variant}</Text>
        <Spacer x={0.5} />
        <Button css={{ minWidth: 'auto' }} onPress={() => setVariant(variants[(variants.indexOf(variant) + 1) % variants.length])}>&gt;</Button>
      </Box2>
      <Spacer y={1} />
      <Box2>
        Disable the dropzone
        <Spacer x={0.5} />
        <Switch
          checked={disabled}
          onChange={() => setDisabled(!disabled)}
        />
      </Box2>
      <Spacer y={1} />
      <Box2>
        bordered?
        <Spacer x={0.5} />
        <Switch
          checked={bordered}
          onChange={() => setBordered(!bordered)}
        />
      </Box2>
      <Spacer y={1} />
      <Text>Border props</Text>
      <Box2>
        <Box2>
          <Button css={{ minWidth: 'auto' }} onPress={() => setBorderColor(borderColors[(borderColors.indexOf(borderColor) - 1 + borderColors.length) % borderColors.length])}>&lt;</Button>
          <Spacer x={0.5} />
          <Text css={{ minWidth: '$20', textAlign: 'center' }}>{borderColor ?? 'undefined'}</Text>
          <Spacer x={0.5} />
          <Button css={{ minWidth: 'auto', marginRight: '$md' }} onPress={() => setBorderColor(borderColors[(borderColors.indexOf(borderColor) + 1) % borderColors.length])}>&gt;</Button>
        </Box2>
        <Box2>
          <Button css={{ minWidth: 'auto' }} onPress={() => setBorderStyle(borderStyles[(borderStyles.indexOf(borderStyle) - 1 + borderStyles.length) % borderStyles.length])}>&lt;</Button>
          <Spacer x={0.5} />
          <Text css={{ minWidth: '$20', textAlign: 'center' }}>{borderStyle ?? 'undefined'}</Text>
          <Spacer x={0.5} />
          <Button css={{ minWidth: 'auto', marginRight: '$md' }} onPress={() => setBorderStyle(borderStyles[(borderStyles.indexOf(borderStyle) + 1) % borderStyles.length])}>&gt;</Button>
        </Box2>
        <Box2>
          <Button css={{ minWidth: 'auto' }} onPress={() => setBorderWeight(borderWeights[(borderWeights.indexOf(borderWeight) - 1 + borderWeights.length) % borderWeights.length])}>&lt;</Button>
          <Spacer x={0.5} />
          <Text css={{ minWidth: '$20', textAlign: 'center' }}>{borderWeight ?? 'undefined'}</Text>
          <Spacer x={0.5} />
          <Button css={{ minWidth: 'auto', marginRight: '$md' }} onPress={() => setBorderWeight(borderWeights[(borderWeights.indexOf(borderWeight) + 1) % borderWeights.length])}>&gt;</Button>
        </Box2>
      </Box2>
    </Box >
  )
}

/*
things to note:
- dropzone component height:
  - do not change the height but rather the minHeight to allow grow
  - if you want a fixed height you can change the height but beware it will not grow to fit content
  
- dropzone preview:
  - not putting anything give the default
  - if you put children, it will remove the default and Dropzone.&lt;iew become inexistant (children will be direct children of Dropzone)

- dropzone dimension/padding:
  - for height, override minHeight
  - for width, use width prop first
  - for padding, altering left/right padding could break the default preview
  - for padding top/bottom, just override it with css
*/