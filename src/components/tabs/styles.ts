import { styled, Tabs } from '@mui/material'

export const MuiTabs = styled(Tabs)`
	.MuiTabs-indicator {
		background-color: #1f4cd5;
		height: 4px;
	}

	.MuiTab-root {
		font-family: 'Inter';
		font-weight: 700;
		font-size: 24px;
		color: #0f141e;
		text-transform: initial;

		&:not(.Mui-selected) {
			color: #6d7c99;
			font-weight: 500;
		}
	}
`
