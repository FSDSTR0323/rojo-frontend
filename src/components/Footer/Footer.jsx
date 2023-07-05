import {
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Box,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

//import styles from './Footer.module.css';

const styles = {
  footer: {
    display: 'flex',
    backgroundColor: '#1c5a1c',
    color: 'white',
    padding: '4rem 0',
    width: '100%',
  },
  box: { marginTop: '3rem', marginBottom: '2rem' },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container fullWidth maxWidth="2xl" sx={styles.footer}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography variant="h6" gutterBottom>
                About FoodInformer
              </Typography>
              <Typography variant="body2">
                FoodInformer is a comprehensive web app that provides
                information about various foods, recipes, and culinary tips. Our
                mission is to empower food enthusiasts with knowledge and
                inspire them to explore new flavors and culinary experiences.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={styles.box}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <ul className={styles.ul}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/recipes">Recipes</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={styles.div}>
              <Typography variant="h6" gutterBottom>
                Connect with Us
              </Typography>
              <div sx={{ '& > *': { marginRight: '0.5rem' } }}>
                <IconButton href="#">
                  <FacebookIcon />
                </IconButton>
                <IconButton href="#">
                  <TwitterIcon />
                </IconButton>
                <IconButton href="#">
                  <InstagramIcon />
                </IconButton>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <div sx={{ backgroundColor: 'primary.dark', padding: '2rem 0' }}>
        <Container>
          <Typography
            variant="body2"
            sx={{ color: 'common.white', textAlign: 'center' }}
          >
            &copy; {currentYear} FoodInformer. All rights reserved
          </Typography>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
