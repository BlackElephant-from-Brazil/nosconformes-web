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
		overflow-y: hidden;
	}
`

export { GlobalStyles }