import { useState, lazy } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SkipNext from '@mui/icons-material/SkipNext'
import SkipPrevious from '@mui/icons-material/SkipPrevious'
import FileDownload from '@mui/icons-material/FileDownload'

import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.mjs'
const Document = lazy(() => import('react-pdf').then((module) => ({ default: module.Document })))
const Page = lazy(() => import('react-pdf').then((module) => ({ default: module.Page })))

export function PDFViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [file, setFile] = useState<string>('cv.pdf')
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'lg'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  const files = ['cv.pdf', 'transcript.pdf']

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function changeFile() {
    const currentIndex = files.indexOf(file)
    const nextIndex = (currentIndex + 1) % files.length
    setFile(files[nextIndex])
    setPageNumber(1)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          p: {
            md: 2,
            lg: 3,
          },
        }}
      >
        <Stack
          direction={'row'}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button disabled={files.indexOf(file) <= 0} onClick={() => changeFile()} sx={{ color: 'white' }}>
            <SkipPrevious fontSize="large" />
          </Button>
          <Typography variant="h2" mt={2}>
            {file === 'cv.pdf' ? 'Resume' : 'Academic Transcript'}
          </Typography>
          <Button
            disabled={files.indexOf(file) >= files.length - 1}
            onClick={() => changeFile()}
            sx={{ width: 'fit-content', color: 'white' }}
          >
            <SkipNext fontSize="large" />
          </Button>
        </Stack>
        <Box
          sx={{
            mb: 2,
            alignContent: 'center',
            minWidth: '20rem',
            minHeight: '30rem',
          }}
        >
          <Document
            file={`/assets/${file}`}
            loading={<CircularProgress />}
            error={<Typography color="primary.main">Failed to load PDF.</Typography>}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              scale={isSmallScreen ? 0.2 : isMediumScreen ? 0.5 : isLargeScreen ? 0.95 : 1}
            />
          </Document>
        </Box>
        <Stack direction={'row'} sx={{ position: 'relative', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
          <Button disabled={pageNumber <= 1} onClick={() => changePage(-1)} sx={{ color: 'white' }}>
            <KeyboardArrowLeft fontSize="large" />
          </Button>
          <Typography variant="body1" width={'30%'} textAlign={'center'}>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </Typography>
          <Button disabled={pageNumber >= numPages!} onClick={() => changePage(1)} sx={{ color: 'white' }}>
            <KeyboardArrowRight fontSize="large" />
          </Button>
          {isLargeScreen && (
            <Button
              component="a"
              href={`./assets/${file}`}
              download
              variant="contained"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            >
              <FileDownload fontSize="large" />
            </Button>
          )}
        </Stack>
      </Paper>
    </Modal>
  )
}
