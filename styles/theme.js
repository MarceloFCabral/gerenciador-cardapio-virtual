import { configureFonts } from 'react-native-paper';

const theme = {
	dark: false,
	mode: 'adaptive',
	roundness: 5,
	colors: {
		primary: '#2f3d74',
		accent: '#4a7c7f',
		background: '#ffffff',
		surface: '#ffebd6',
		text: '#000000',
		disabled: '#e6e6e6',
		placeholder: '#8c8c8c',
		backdrop: '#ffebd6'
	},
	fonts: configureFonts(fontConfig),
	animation: {
		scale: 2
	}
};

const fontConfig = {
	ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
	},
	web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  }
};

export default theme;