import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #E9EFF5;
    color: #0F141E;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

	#root {
		min-height: 100vh;
		max-width: 100vw;
		display: flex;
		flex-direction: column;
		padding: 0;
		overflow-x: hidden;
	}

	::-moz-selection {
		color: #FFFFFF;
		background: #1F4CD5;
	}

	::selection {
		color: #FFFFFF;
		background: #1F4CD5;
	}

	.access-level-menu {
		.MuiPaper-root {
			border-radius: 10px;
		}
	}

	.scroll {
		::-webkit-scrollbar {
			width: 8px;
			height: 8px;
		}

		::-webkit-scrollbar-thumb {
			background-color: rgba(124, 124, 124, 0.5);
			border-radius: 4px;
		}

		::-webkit-scrollbar-track {
			background-color: rgba(124, 124, 124, 0.3);
			border-radius: 4px;
		}
	}

	p, h1, h2, h3, h4, h5, h6, span, div, a, li, ul, ol, button, input, textarea, label, tr, td, th, table {
		font-family: 'Inter' !important;
	}
`

export { GlobalStyles }
