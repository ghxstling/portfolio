import { useState, FormEvent } from 'react'

import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { getApiUrl } from './helper/functions'

export function Contact() {
  type Field = string | undefined

  const [fullName, setFullName] = useState<Field>(undefined)
  const [email, setEmail] = useState<Field>(undefined)
  const [phone, setPhone] = useState<Field>(undefined)
  const [subject, setSubject] = useState<Field>(undefined)
  const [body, setBody] = useState<Field>(undefined)
  const [message, setMessage] = useState<Field>(undefined)
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    subject: false,
    body: false,
  })

  const TEXTFIELD_WIDTH = 'calc(50% - 0.5rem)'

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setMessage('Submitting...')
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      subject: true,
      body: true,
    })

    if (!fullName || !email || !subject || !body) {
      setMessage('Please fill out all required fields.')
      return
    }

    const formData = {
      fullName,
      email,
      phone: phone ? phone : 'N/A',
      subject,
      body,
    }

    try {
      const url = getApiUrl('/api/contact')
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (res.status === 429) {
        setMessage('You can only send an email once every 5 minutes.')
      } else {
        setMessage("Email sent successfully! I'll get back to you as soon as possible.")
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setMessage('Failed to send email, please try again later.')
    }
  }

  return (
    <Paper id="contact">
      <Box maxWidth={'95%'} sx={{ mx: '1rem', textAlign: 'center' }}>
        <Typography variant="h2">Let's Work Together</Typography>
        <Typography variant="body1">
          Got ideas for your website or interested in working with me? Get in touch!
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} method="POST" autoComplete="off" noValidate>
        <Grid
          component={Card}
          container
          spacing={2}
          sx={{
            mt: '1rem',
            maxWidth: '50rem',
            p: '1.5rem',
            mx: '1rem',
            justifySelf: 'center',
          }}
        >
          <FormControl error={!fullName} fullWidth>
            <TextField
              id="form-fullname"
              label="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleBlur('fullName')}
            />
            {touched.fullName && !fullName && <FormHelperText>Full Name is required.</FormHelperText>}
          </FormControl>
          <Grid container spacing={2} sx={{ width: '100%' }}>
            <FormControl error={!email || !/\S+@\S+\.\S+/.test(email)} sx={{ width: TEXTFIELD_WIDTH }}>
              <TextField
                id="form-email"
                type="email"
                label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
              />
              {touched.email && (!email || !/\S+@\S+\.\S+/.test(email)) && (
                <FormHelperText>Invalid Email address.</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!phone || !/^[0-9]{9,10}$/.test(phone)} sx={{ width: TEXTFIELD_WIDTH }}>
              <TextField
                id="form-phone"
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleBlur('phone')}
              />
              {touched.phone && phone != '' && phone != null && !/^[0-9]{9,10}$/.test(phone) && (
                <FormHelperText>Please enter a valid phone number (9-10 digits).</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <FormControl error={!subject} fullWidth>
            <TextField
              id="form-subject"
              label="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onBlur={() => handleBlur('subject')}
            />
            {touched.subject && !subject && <FormHelperText>Subject is required.</FormHelperText>}
          </FormControl>
          <FormControl error={!body} fullWidth>
            <TextField
              id="form-content"
              label="Body"
              required
              multiline
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onBlur={() => handleBlur('body')}
            />
            {touched.body && !body && <FormHelperText>Message body is required.</FormHelperText>}
          </FormControl>
          <Button type="submit" variant="contained" sx={{ py: '1rem', mt: '0.5rem', width: '100%' }}>
            Contact Me
          </Button>
          {message && (
            <Typography
              variant="body2"
              color="primary.main"
              sx={{
                maxWidth: '100%',
                wordWrap: 'break-word',
              }}
            >
              {message}
            </Typography>
          )}
        </Grid>
      </Box>
    </Paper>
  )
}
