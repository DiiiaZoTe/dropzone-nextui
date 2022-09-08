import Head from 'next/head'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Text, styled, useTheme, Switch, Grid, Container, Collapse, Spacer } from '@nextui-org/react'
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
  minWidth: '$48'
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

  const [disabled, setDisabled] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [alwaysShowStatus, setAlwaysShowStatus] = useState(true);

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
            width='lg' animated={animated}
            maxSize={getBytes(400, 'KB')} maxFiles={4}
            openRef={openRef}
          // accept={{ 'image/*': [] }}
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
            <Dropzone.Error spaceY='above' />
            <Dropzone.Preview spaceY='above' />
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
        <Collapse shadow title="Main options" bordered={false}>
          <Grid.Container gap={2} justify='space-around' alignItems='center'>
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

        <Collapse shadow title="Style options" bordered={false}>
          <Grid.Container gap={2} justify='space-around'>
            <Grid>
              <PrevNext what='Color' value={color} setter={setColor} valueArr={colors} />
            </Grid>
            <Grid>
              <PrevNext what='Variant' value={variant} setter={setVariant} valueArr={variants} />
            </Grid>
          </Grid.Container>
        </Collapse>

        <Spacer y={1} />

        <Collapse shadow title="Options switches" bordered={false}>
          <Grid.Container gap={2} justify='space-around'>
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
          </Grid.Container>
        </Collapse>

        <Spacer y={1} />

        <Collapse shadow title="Border style" bordered={false}>
          <Grid.Container gap={2} justify='space-around'>
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

    </Container>
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
