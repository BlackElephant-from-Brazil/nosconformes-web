import styled from 'styled-components'

export const Container = styled.div`
	.page-wrapper {
		max-width: 700px;

		.page-header {
			display: flex;

			.grouping-info {
				flex-grow: 1;
				margin-left: 16px;

				h2 {
					margin-bottom: 16px;
				}
			}
		}

		.tab-container {
			margin-top: 60px;

			.select-question-space {
				height: 98px;
				width: 100%;
			}
		}
	}
`
