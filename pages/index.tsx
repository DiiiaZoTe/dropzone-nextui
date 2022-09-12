import Head from 'next/head'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Text, styled, useTheme, Switch, Grid, Container, Collapse, Spacer, Input, Dropdown } from '@nextui-org/react'
import Dropzone, { getBytes } from '@components/dropzone'
import { useEffect, useRef, useState } from 'react'
import { Error, File, Upload } from '@utils/icons/dropzone'

const Box = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '$48',
  maxWidth: '100%',
})

const BoxGrid = styled('div', {
  display: 'grid',
  // grid template for button/text/button
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  minWidth: '$48',
});

const Fullscreen = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$md',
  width: 'fit-content',
  height: 'fit-content',
  background: 'White',
  padding: '$lg',
  shadow: '$md',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(125,125,125,0.2)',
    zIndex: -1,
  },
});


const PrevNext = (props: { what: string; value: any, setter: any, valueArr: any[] }) => {
  const { what, value, setter, valueArr } = props
  return (
    <>
      <Text h4>{what}</Text>
      <BoxGrid>
        <Button css={{ minWidth: 'auto' }} onPress={() =>
          setter(valueArr[(valueArr.indexOf(value) - 1 + valueArr.length) % valueArr.length])}>&lt;
        </Button>
        <Text css={{ textAlign: 'center' }}>{value ?? 'Undefined'}</Text>
        <Button css={{ minWidth: 'auto' }} onPress={() =>
          setter(valueArr[(valueArr.indexOf(value) + 1) % valueArr.length])}>&gt;
        </Button>
      </BoxGrid>
    </>
  );
}

const Switcher = (props: { what: string; value: any, setter: any, notTrueFalse?: { checked: any, unchecked: any, toDisplay: any } }) => {
  const { what, value, setter, notTrueFalse } = props
  return (
    <Box>
      <Text h4>
        {notTrueFalse ? `${what}: ${notTrueFalse.toDisplay}` : what}
      </Text>
      {
        notTrueFalse
          ? <Switch checked={value} onChange={(e) => setter(e.target.checked ? notTrueFalse.checked : notTrueFalse.unchecked)} />
          : <Switch checked={value} onChange={() => setter(!value)} />
      }
    </Box>
  );
}


export default function Home() {

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  const colors = ['default', 'primary', 'secondary', 'warning'];
  const [color, setColor] = useState(colors[0] as any);
  const variants = ['flat', 'light', 'solid', 'shadow', 'shadow_flat'];
  const [variant, setVariant] = useState(variants[0] as any);
  const widths = ['xs', 'sm', 'md', 'lg'];
  const [width, setWidth] = useState(widths[3] as any);
  const sizeImagePreviews = ['sm', 'md', 'lg'];
  const [sizeImagePreview, setSizeImagePreview] = useState(sizeImagePreviews[2] as any);

  const [disabled, setDisabled] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [alwaysShowStatus, setAlwaysShowStatus] = useState(true);
  const [bordered, setBordered] = useState(false);
  const [allowImagePreview, setAllowImagePreview] = useState(false);

  const byteSizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const [byteSize, setByteSize] = useState(byteSizes[1] as any);
  const [byteAmount, setByteAmount] = useState(10);
  const [maxFiles, setMaxFiles] = useState(5);

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
    <Container sm display='flex' justify='center' gap={1}>

      <Head>
        <title>Dropzone test with Nextui</title>
      </Head>

      <Spacer y={2} />

      <Grid.Container gap={2} justify='center'>
        <Grid xs justify='center'>
          <Dropzone
            alwaysShowStatus={alwaysShowStatus}
            color={color} variant={variant} disabled={disabled}
            bordered={bordered} borderColor={borderColor} borderWeight={borderWeight} borderStyle={borderStyle}
            files={files} setFiles={setFiles}
            width={width} animated={animated}
            maxSize={getBytes(byteAmount, byteSize)} maxFiles={maxFiles}
            openRef={openRef}
          // accept={{ 'image/*': [] }}
          >
            <Dropzone.Fullscreen
              contentAccept={
                <Fullscreen>
                  <Upload fill='black' />
                  <Text color='black' css={{ textAlign: 'center' }}>Release to select files</Text>
                </Fullscreen>
              }
            // contentReject={
            //   <Fullscreen>
            //     <Error fill='black' />
            //     <Text color='black' css={{ textAlign: 'center' }}>Invalid files, please try again</Text>
            //   </Fullscreen>
            // }
            />
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
            <Dropzone.Error spaceY='above' />
            <Dropzone.Preview spaceY='above' allowImagePreview={allowImagePreview} sizeImagePreview={sizeImagePreview} />
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
        </Grid>
      </Grid.Container>

      <Spacer y={2} />

      <Collapse.Group accordion={false} css={{ width: '100%' }} bordered={false}>
        <Collapse shadow title="Main options" css={{ border: 'none !important' }}>
          <Grid.Container gap={2} justify='center' alignItems='center'>
            <Grid justify='center'>
              <Button onPress={() => openRef.current?.()}>
                Click me to add file
              </Button>
            </Grid>
            <Grid justify='center'>
              <Button onPress={() => setFiles([])}>
                remove all files
              </Button>
            </Grid>
            <Grid>
              <Switcher what='Theme' value={isDark} setter={setTheme} notTrueFalse={{ checked: 'dark', unchecked: 'Light', toDisplay: type }} />
            </Grid>
          </Grid.Container>
        </Collapse>

        <Spacer y={1} />

        <Collapse shadow title="Style options" css={{ border: 'none !important' }}>
          <Grid.Container gap={2} justify='center'>
            <Grid>
              <PrevNext what='Color' value={color} setter={setColor} valueArr={colors} />
            </Grid>
            <Grid>
              <PrevNext what='Variant' value={variant} setter={setVariant} valueArr={variants} />
            </Grid>
            <Grid>
              <PrevNext what='Width' value={width} setter={setWidth} valueArr={widths} />
            </Grid>
            <Grid>
              <PrevNext what='Image preview size' value={sizeImagePreview} setter={setSizeImagePreview} valueArr={sizeImagePreviews} />
            </Grid>
          </Grid.Container>
        </Collapse>

        <Spacer y={1} />

        <Collapse shadow title="Options switches" css={{ border: 'none !important' }}>
          <Grid.Container gap={2} justify='center'>
            <Grid>
              <Switcher what='Disabled' value={disabled} setter={setDisabled} />
            </Grid>
            <Grid>
              <Switcher what='Animated' value={animated} setter={setAnimated} />
            </Grid>
            <Grid>
              <Switcher what='Always show' value={alwaysShowStatus} setter={setAlwaysShowStatus} />
            </Grid>
            <Grid>
              <Switcher what='Bordered' value={bordered} setter={setBordered} />
            </Grid>
            <Grid>
              <Switcher what='Image preview' value={allowImagePreview} setter={setAllowImagePreview} />
            </Grid>
          </Grid.Container>
        </Collapse>

        <Spacer y={1} />

        <Collapse shadow title="Options controls" css={{ border: 'none !important' }}>
          <Grid.Container gap={2} justify='center'>
            <Grid>
              <Text h4>File size</Text>
              <BoxGrid css={{ maxWidth: '$48' }} >
                <Input aria-label={`Input amount in ${byteSize}`} css={{ '& .nextui-input-content--right': { width: 'auto', padding: 0 } }}
                  type='number' initialValue={byteAmount.toString()} placeholder='Amount'
                  onChange={(e) => setByteAmount(Number(e.target.value))}
                  contentRight={
                    <Dropdown>
                      <Dropdown.Button flat color={color == 'default' ? 'primary' : color}>
                        {byteSize}
                      </Dropdown.Button>
                      <Dropdown.Menu
                        aria-label="select a size"
                        color={color}
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={byteSize}
                        onSelectionChange={(key: any) => { setByteSize(key.currentKey) }}
                      >
                        {byteSizes.map((size) => {
                          return (<Dropdown.Item key={size}>{size}</Dropdown.Item>)
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  }
                />
              </BoxGrid>
            </Grid>
            <Grid>
              <Text h4>Max files</Text>
              <Input css={{ maxWidth: '$48' }}
                aria-label='Input max files allowed'
                type='number' initialValue={maxFiles.toString()} placeholder='Amount'
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value < files.length)
                    setFiles(files.slice(0, value))
                  setMaxFiles(value);
                }}
              />
            </Grid>
          </Grid.Container>
        </Collapse>

        <Spacer y={1} />

        <Collapse shadow title="Border style" css={{ border: 'none !important' }}>
          <Grid.Container gap={2} justify='center'>
            <Grid>
              <PrevNext what='Border color' value={borderColor} setter={setBorderColor} valueArr={borderColors} />
            </Grid>
            <Grid>
              <PrevNext what='Border style' value={borderStyle} setter={setBorderStyle} valueArr={borderStyles} />
            </Grid>
            <Grid>
              <PrevNext what='Border weight' value={borderWeight} setter={setBorderWeight} valueArr={borderWeights} />
            </Grid>
          </Grid.Container>
        </Collapse>
      </Collapse.Group>

      <Spacer y={2} />

    </Container >
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

- if using NextUI Grid, make sure to use xs on the grid containing the Dropzone
*/
