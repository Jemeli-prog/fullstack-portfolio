import React, { useState } from 'react'; // Import useState
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Link,
  IconButton,
  Chip,
} from '@mui/material';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function App() {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle input changes (controlled components)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Corrected typo: preventDefult() to preventDefault()

    // Define your Django API endpoint URL
    // IMPORTANT: For local development, use your Django development server URL:
    // const DJANGO_API_URL = 'http://127.0.0.1:8000/api/contact/';
    // For production deployment, you MUST change this to your deployed Django backend URL:
    const DJANGO_API_URL = 'http://127.0.0.1:8000/api/contact/'; // Placeholder, change for production!

    try {
      const response = await fetch(DJANGO_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If you were using Django's CSRF for session-based auth, you'd need to send a token here.
          // For a simple public API endpoint like a contact form, DRF's default
          // 'AllowAny' permission usually means no CSRF token is strictly needed for POST from a different origin.
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (response.ok) { // Corrected: Response.ok to response.ok
        // If the response is successful (status 200-299)
        const result = await response.json();
        alert(result.message || 'Message sent successfully!'); // Show success message from backend
        // Clear the form after successful submission
        setFormData({ name: '', email: '', message: '' });
      } else { // Added missing opening curly brace for else block
        // If the response is an error
        const errorData = await response.json();
        console.error('API Error:', errorData);
        alert(`Failed to send message. Please check the form and try again.\nDetails: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      // Handle network errors (e.g., server not running, CORS issues)
      console.error('Network Error:', error);
      alert('There was a problem connecting to the server. Please try again later.');
    }
  };


  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 1100 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                borderRadius: '8px',
                padding: '8px',
                '&:hover': { backgroundColor: 'rgba(99, 102, 241, 0.05)' }
              }}
            >
              Ruth Jemeli Kiptoo
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              <Button
                href="#about"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 'medium',
                  '&:hover': { color: 'primary.main', backgroundColor: 'rgba(99, 102, 241, 0.05)', borderRadius: '8px' }
                }}
              >
                About Me
              </Button>
              <Button href="#projects" sx={{ color: 'text.secondary', fontWeight: 'medium', '&:hover': { color: 'primary.main', backgroundColor: 'rgba(99, 102, 241, 0.05)', borderRadius: '8px' } }}>
                Projects
              </Button>
              <Button href="#contact" sx={{ color: 'text.secondary', fontWeight: 'medium', '&:hover': { color: 'primary.main', backgroundColor: 'rgba(99, 102, 241, 0.05)', borderRadius: '8px' } }}>
                Contact
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        id="hero"
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: '20px',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)',
          textAlign: 'center',
          py: { xs: 10, md: 15 },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <Box
              component="img"
              src='https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2VyfGVufDB8fDB8fHww'
              alt='Profile Picture'
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                mx: 'auto',
                objectFit: 'cover',
                border: '4px solid',
                borderColor: 'primary.light',
                boxShadow: 3,
              }}
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/667EEA/FFFFFF?text=Profile"; }}
            />
          </Box>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'extrabold',
              color: 'text.primary',
              mb: 2,
              animation: 'fadeInUp 1s ease-out forwards',
              opacity: 0,
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(-20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              }
            }}
          >
            Hi,I'm <Box component="span" sx={{ color: 'primary.main' }}>Ruth Jemeli Kiptoo</Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 4,
              animation: 'fadeInUp 1s ease-out forwards 0.3s',
              opacity: 0,
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            A passionate <Box component="span" sx={{ fontWeight: 'semibold', color: 'secondary.main' }}>Full stack developer</Box>
          </Typography>
          <Button
            href="#projects"
            variant="contained"
            size='large'
            sx={{
              borderRadius: '9999px',
              px: 4,
              py: 1.5,
              boxShadow: 3,
              '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.3s ease-in-out' },
            }}
          >
            View My Work
          </Button>
        </Container>
      </Box>

      <Box id='about' sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth='md'>
          <Typography variant='h4' component='h2' align='center' sx={{ fontWeight: 'bold', color: 'text.primary', mb: 6 }}>
            About Me 🚀
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant='body1' sx={{ color: "text.primary", lineHeight: 1.7, mb: 2 }}>
                A passionate and adaptable tech enthusiast with experience in web development using HTML, CSS, JavaScript, React, and backend development with Python. Gained hands-on exposure through academic and personal projects, Thrives in collaborative environments and is eager to contribute to technology-driven teams.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h3" sx={{ fontWeight: 'semibold', color: 'text.primary', mb: 2 }}>
                Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {['HTML', 'CSS', 'JavaScript', 'React', 'postgreSQL', 'Python', 'Django', 'Flask'].map(
                  (skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      color='primary'
                      variant='outlined'
                      sx={{
                        borderRadius: '20px',
                        fontWeight: 'medium',
                        '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s ease-in-out', boxShadow: 1 },
                      }}
                    />
                  )
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id='projects' sx={{ py: 10, bgcolor: 'grey.100' }}>
        <Container maxWidth='md'>
          <Typography variant='h4' component='h2' align='center' sx={{ fontWeight: 'bold', color: 'text.primary', mb: 6 }}>
            My Projects 🌟
          </Typography>
          <Grid container spacing={4} justifyContent='center'>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{
                borderRadius: '12px',
                boxShadow: 3,
                '&:hover': { boxShadow: 6, transform: 'translateY(-8px)' },
                transition: 'all 0.3s ease-in-out',
                border: '1px solid',
                borderColor: 'grey.200'
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://placehold.co/600x400/818CF8/FFFFFF?text=Project+1"
                  alt="Customer Feedback CLI Screenshot"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/818CF8/FFFFFF?text=Placeholder"; }}
                />
                <CardContent>
                  <Typography variant='h6' component='h3' sx={{ fontWeight: 'bold', mb: 1.5 }}>
                    Customer Feedback CLI
                  </Typography>
                  <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                    - Designed a CLI tool to collect and manage customer feedback using Python and SQLAlchemy ORM.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Link
                      href="https://github.com/your-username/customer-feedback-cli-repo"
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      sx={{ display: 'flex', alignItems: 'center', fontWeight: 'medium', textDecoration: 'none' }}
                    >
                      Code <GitHubIcon sx={{ ml: 0.5, fontSize: '18px' }} />
                    </Link>

                  </Box>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Container>
      </Box>

      <Box id='contact' sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth='sm'>
          <Typography variant='h4' component='h2' align='center' sx={{ fontWeight: 'bold', color: 'text.primary', mb: 6 }}>
            Get in Touch ✉️
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              bgcolor: 'grey.50',
              p: 4,
              borderRadius: '12px',
              boxShadow: 3,
              border: '1px solid',
              borderColor: 'grey.200'
            }}
          >
            <TextField
              fullWidth
              label='Name'
              name='name' // Added name attribute
              value={formData.name} // Added value binding
              onChange={handleChange} // Added onChange handler
              variant='outlined'
              margin='normal'
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: '8px' } }}
              required // Added required attribute
            />
            <TextField
              fullWidth
              label='Email'
              name='email' // Added name attribute
              value={formData.email} // Added value binding
              onChange={handleChange} // Added onChange handler
              type='email'
              variant='outlined'
              margin='normal'
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: '8px' } }}
              required // Added required attribute
            />
            <TextField
              fullWidth
              label='Message'
              name='message' // Added name attribute
              value={formData.message} // Added value binding
              onChange={handleChange} // Added onChange handler
              multiline
              rows={6}
              variant='outlined'
              margin='normal'
              sx={{ mb: 3 }}
              InputProps={{ sx: { borderRadius: '8px' } }}
              required // Added required attribute
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '9999px',
                  px: 4,
                  py: 1.5,
                  boxShadow: 3,
                  '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.3s ease-in-out' },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
              You can also find me on:
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              <IconButton href="https://linkedin.com/in/ruth kiptoo" target="_blank" rel="noopener noreferrer" color="primary" sx={{ '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.3s ease-in-out' } }}>
                <LinkedInIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <IconButton href="https://github.com/jemeli-prog" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.3s ease-in-out' } }}>
                <GitHubIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'common.white', py: 4, textAlign: 'center', mt: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="body1" sx={{ mb: 1 }}>
            &copy; {new Date().getFullYear()} Ruth Jemeli Kiptoo. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Built with React and Material-UI
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
