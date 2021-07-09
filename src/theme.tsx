import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#556cd6',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#fff',
		},
	},
	typography: {
		h6: {
			fontSize: 20,
			fontWeight: 400,
		},
		caption: {
			fontSize: 14,
			fontWeight: 600,
		},
	},
});

export default theme;
