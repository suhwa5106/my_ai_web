import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ButtonSection from './components/sections/button-section';
import InputSection from './components/sections/input-section';
import NavigationSection from './components/sections/navigation-section';
import DropdownSection from './components/sections/dropdown-section';
import CheckboxSection from './components/sections/checkbox-section';
import RadioSection from './components/sections/radio-section';
import SliderSection from './components/sections/slider-section';
import ModalSection from './components/sections/modal-section';
import CardSection from './components/sections/card-section';
import DragDropSection from './components/sections/dragdrop-section';
import ScrollSection from './components/sections/scroll-section';

function App() {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
            fontWeight: 'bold',
            fontSize: { xs: '1.75rem', md: '2.5rem' }
          }}
        >
          UI Components Gallery
        </Typography>
        <ButtonSection />
        <InputSection />
        <NavigationSection />
        <DropdownSection />
        <CheckboxSection />
        <RadioSection />
        <SliderSection />
        <ModalSection />
        <CardSection />
        <DragDropSection />
        <ScrollSection />
      </Container>
    </Box>
  );
}

export default App;
