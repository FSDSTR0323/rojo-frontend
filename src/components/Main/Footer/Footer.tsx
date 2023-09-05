import { Container, Typography } from '@mui/material'

const styles = {
  footer: {
    marginTop: 'auto'
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#1c5a1c',
    color: 'white',
    padding: 0,
    width: '100%',
    marginTop: 'auto'
  },
  typography: { margin: '1.5em 0', color: 'common.white', textAlign: 'right' }
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={styles.footer}>
      <Container maxWidth="2xl" sx={styles.container}>
        <Typography variant="body2" sx={styles.typography}>
          &copy; {currentYear} FoodInformer. All rights reserved
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
