import React from 'react'
import '@testing-library/jest-dom'
import {
	act,
	cleanup,
	fireEvent,
	render,
	RenderResult,
} from '@testing-library/react'
import mockAxios from 'jest-mock-axios'
import { Company } from 'interfaces/company.type'
import { Companies } from 'modules/companies/pages/companies'

let companiesPageElement: RenderResult

const companies: Company[] = [
	{
		_eq: 'id-company-1',
		logo: 'https://s.yimg.com/ny/api/res/1.2/a19vkjSUoD4hVV0djOpSLw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Nzc-/https://s.yimg.com/os/creatr-uploaded-images/2020-07/20e95610-d02d-11ea-9f0c-81042fd4c51a',
		name: 'Casas Bahia',
		manager: {
			name: 'Daniel Ribeiro',
			office: 'Chefe de TI',
			department: 'TI',
			email: 'daniel@casasbahia.com.br',
			phone: '19995545043',
		},
		status: 'late',
		cnpj: '27777505000113',
		site: 'https://casasbahia.com.br',
		auditors: [
			{
				_eq: 'id-auditor-1',
				name: 'Patrick Pessoa',
				photo:
					'https://cdn.vnda.com.br/cobogo/2021/10/29/19_10_3_309_site_autor_PatrickPessoa.jpg?v=1638557521',
			},
			{
				_eq: 'id-auditor-2',
				name: 'Raquel Ribeiro',
				photo:
					'https://www.arita.com.br/wp-content/uploads/2020/08/pessoa-expansiva-principais-caracteristicas-desta-personalidade.jpg',
			},
		],
	},
	{
		_eq: 'id-company-2',
		logo: 'https://www.anacouto.com.br/wp-content/uploads/2021/07/GALERIA-SITE-AMERICANAS.png',
		name: 'Americanas',
		status: 'inprogress',
		cnpj: '27777505000113',
		site: 'https://casasbahia.com.br',
		auditors: [
			{
				_eq: 'id-auditor-2',
				name: 'Raquel Ribeiro',
				photo:
					'https://www.arita.com.br/wp-content/uploads/2020/08/pessoa-expansiva-principais-caracteristicas-desta-personalidade.jpg',
			},
		],
	},
	{
		_eq: 'id-company-3',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Magalu_-_novo_logo.png',
		name: 'Magalu',
		manager: {
			name: 'Daniel Ribeiro',
			office: 'Chefe de TI',
			department: 'TI',
			email: 'daniel@casasbahia.com.br',
			phone: '19995545043',
		},
		status: 'finished',
		cnpj: '27777505000113',
		site: 'https://casasbahia.com.br',
		auditors: [
			{
				_eq: 'id-auditor-1',
				name: 'Patrick Pessoa',
				photo:
					'https://cdn.vnda.com.br/cobogo/2021/10/29/19_10_3_309_site_autor_PatrickPessoa.jpg?v=1638557521',
			},
		],
	},
]

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
	useNavigate: () => mockedUseNavigate,
}))

const mockedEnqueueSnackbar = jest.fn()

jest.mock('notistack', () => ({
	enqueueSnackbar: () => mockedEnqueueSnackbar,
}))

describe('<Companies />', () => {
	afterEach(() => {
		cleanup()
		mockAxios.reset()
	})

	it('should be able to render correctly the page', async () => {
		mockAxios.get.mockImplementation().mockResolvedValue({ data: companies })
		await act(async () => {
			companiesPageElement = render(<Companies />)
		})
		expect(mockAxios.get).toHaveBeenCalledWith('/companies')
		expect(
			await companiesPageElement.findByText('Empresas'),
		).toBeInTheDocument()
		expect(
			await companiesPageElement.findByPlaceholderText(
				'Pesquise pelo nome da empresa ou do gestor',
			),
		).toBeInTheDocument()
		expect(
			await companiesPageElement.findByText('Criar nova empresa +'),
		).toBeInTheDocument()
		expect(
			await companiesPageElement.findAllByTestId('company-card'),
		).toHaveLength(3)
	})

	it('should be able to go to Create first company page if no companies has found in database', async () => {
		mockAxios.get.mockImplementation().mockResolvedValue({ data: [] })
		await act(async () => {
			companiesPageElement = render(<Companies />)
		})
		expect(mockAxios.get).toHaveBeenCalledWith('/companies')
		expect(companiesPageElement.queryAllByTestId('company-card')).toHaveLength(
			0,
		)
		expect(
			companiesPageElement.queryByTestId('company-card'),
		).not.toBeInTheDocument()
		expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
		expect(mockedUseNavigate).toHaveBeenCalledWith(
			'/cadastre-sua-primeira-empresa',
		)
	})

	it('should be able to render all companies that are listed', async () => {
		mockAxios.get.mockImplementation().mockResolvedValue({ data: companies })
		await act(async () => {
			companiesPageElement = render(<Companies />)
		})
		const companyCards = await companiesPageElement.findAllByTestId(
			'company-card',
		)
		expect(companyCards).toHaveLength(3)
		expect(companyCards[0]).toHaveTextContent('Casas Bahia')
		expect(companyCards[1]).not.toHaveTextContent('Gestor:')
		expect(companyCards[2]).toHaveTextContent('Daniel Ribeiro')
	})

	it('should be able to see auditors list when click in auditors avatar', async () => {
		mockAxios.get.mockImplementation().mockResolvedValue({ data: companies })
		await act(async () => {
			companiesPageElement = render(<Companies />)
		})

		const firstCompanyCardAuditors = (
			await companiesPageElement.findAllByTestId('auditors')
		)[0]

		await act(async () => {
			fireEvent.click(firstCompanyCardAuditors)
		})

		expect(
			await companiesPageElement.findByText(companies[0].auditors[0].name),
		).toBeInTheDocument()
	})

	it('should be able to open the Create new company drawer when click in "Criar nova empresa +"', async () => {
		mockAxios.get.mockImplementation().mockResolvedValue({ data: companies })
		await act(async () => {
			companiesPageElement = render(<Companies />)
		})

		expect(
			companiesPageElement.queryByTestId('create-company-drawer'),
		).not.toBeInTheDocument()

		const buttonCreateNewCompany = await companiesPageElement.findByText(
			'Criar nova empresa +',
		)
		await act(async () => {
			fireEvent.click(buttonCreateNewCompany)
		})

		expect(
			companiesPageElement.queryByTestId('create-company-drawer'),
		).toBeInTheDocument()
	})

	it('should be able to filter the companies when write in search field', async () => {
		mockAxios.get.mockImplementation().mockResolvedValue({ data: companies })
		await act(async () => {
			companiesPageElement = render(<Companies />)
		})

		mockAxios.get
			.mockImplementation()
			.mockResolvedValue({ data: [companies[1]] })

		const searchInput = await companiesPageElement.findByPlaceholderText(
			'Pesquise pelo nome da empresa ou do gestor',
		)
		await act(async () => {
			fireEvent.change(searchInput, {
				target: {
					value: 'Americanas',
				},
			})
		})

		expect(mockAxios.get).toHaveBeenCalledWith('/companies?query=Americanas')

		const companyCards = await companiesPageElement.findAllByTestId(
			'company-card',
		)

		expect(companyCards.length).toBe(1)
		expect(companyCards[0]).toHaveTextContent('Americanas')
	})

	it('should be able to open the company data when click in company name in the card title', async () => {
		mockAxios.get.mockImplementation().mockResolvedValue({ data: companies })
		await act(async () => {
			companiesPageElement = render(<Companies />)
		})

		const companyCardTitle = await companiesPageElement.findByText(
			companies[0].name,
		)

		fireEvent.click(companyCardTitle)

		expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
		expect(mockedUseNavigate).toHaveBeenCalledWith(
			`/detalhes-da-empresa/${companies[0]._eq}`,
		)
	})

	describe('create new company', () => {
		it('should be able to close the drawer when clicked in X on left top', async () => {
			mockAxios.get.mockImplementation().mockResolvedValue({ data: companies })
			await act(async () => {
				companiesPageElement = render(<Companies />)
			})

			const buttonCreateNewCompany = await companiesPageElement.findByText(
				'Criar nova empresa +',
			)
			await act(async () => {
				fireEvent.click(buttonCreateNewCompany)
			})

			expect(
				companiesPageElement.queryByTestId('create-company-drawer'),
			).toBeInTheDocument()

			const closeDrawerButton = await companiesPageElement.findByTestId(
				'close-drawer-button',
			)
			await act(async () => {
				fireEvent.click(closeDrawerButton)
			})
			setTimeout(() => {
				expect(
					companiesPageElement.queryByTestId('create-company-drawer'),
				).not.toBeInTheDocument()
			}, 1000)
		})

		it('should be able to close drawer when save company without manager data', async () => {
			mockAxios.get.mockImplementation().mockResolvedValue({ data: companies })
			await act(async () => {
				companiesPageElement = render(<Companies />)
			})
			const buttonCreateNewCompany = await companiesPageElement.findByText(
				'Criar nova empresa +',
			)
			await act(async () => {
				fireEvent.click(buttonCreateNewCompany)
			})

			const nextButton = await companiesPageElement.findByText('Próximo')
			const companyNameInput = await companiesPageElement.findByLabelText(
				'Nome da empresa',
			)
			const companyCNPJInput = await companiesPageElement.findByLabelText(
				'CNPJ',
			)
			const companySiteInput = await companiesPageElement.findByLabelText(
				'Site',
			)
			fireEvent.change(companyNameInput, {
				target: {
					value: 'valid-company-name',
				},
			})

			fireEvent.change(companyCNPJInput, {
				target: {
					value: '27777505000113',
				},
			})

			fireEvent.change(companySiteInput, {
				target: {
					value: 'https://validsite.com.br/',
				},
			})

			await act(async () => {
				fireEvent.click(nextButton)
			})

			const jumpStepButton = await companiesPageElement.findByText(
				'Pular etapa',
			)

			await act(async () => {
				fireEvent.click(jumpStepButton)
			})

			setTimeout(() => {
				expect(
					companiesPageElement.queryByTestId('create-company-drawer'),
				).not.toBeInTheDocument()
			}, 500)
		})

		it('should be able to close drawer when save company with manager data', async () => {
			mockAxios.get.mockImplementation().mockResolvedValue({ data: companies })
			await act(async () => {
				companiesPageElement = render(<Companies />)
			})
			const buttonCreateNewCompany = await companiesPageElement.findByText(
				'Criar nova empresa +',
			)
			await act(async () => {
				fireEvent.click(buttonCreateNewCompany)
			})

			const nextButton = await companiesPageElement.findByText('Próximo')
			const companyNameInput = await companiesPageElement.findByLabelText(
				'Nome da empresa',
			)
			const companyCNPJInput = await companiesPageElement.findByLabelText(
				'CNPJ',
			)
			const companySiteInput = await companiesPageElement.findByLabelText(
				'Site',
			)
			fireEvent.change(companyNameInput, {
				target: {
					value: 'valid-company-name',
				},
			})

			fireEvent.change(companyCNPJInput, {
				target: {
					value: '27777505000113',
				},
			})

			fireEvent.change(companySiteInput, {
				target: {
					value: 'https://validsite.com.br/',
				},
			})

			await act(async () => {
				fireEvent.click(nextButton)
			})

			const registerCompanyButton = await companiesPageElement.findByText(
				'Cadastrar empresa',
			)
			const nameInput = await companiesPageElement.findByLabelText('Nome')
			const officeInput = await companiesPageElement.findByLabelText('Cargo')
			const departmentInput = await companiesPageElement.findByLabelText(
				'Departamento',
			)
			const emailInput = await companiesPageElement.findByLabelText('Email')
			const phoneInput = await companiesPageElement.findByLabelText('Telefone')

			fireEvent.change(nameInput, {
				target: {
					value: 'valid-name',
				},
			})
			fireEvent.change(officeInput, {
				target: {
					value: 'valid-office',
				},
			})
			fireEvent.change(departmentInput, {
				target: {
					value: 'valid-department',
				},
			})
			fireEvent.change(emailInput, {
				target: {
					value: 'valid@email.com',
				},
			})
			fireEvent.change(phoneInput, {
				target: {
					value: '19995545043',
				},
			})

			await act(async () => {
				fireEvent.click(registerCompanyButton)
			})

			setTimeout(() => {
				expect(
					companiesPageElement.queryByTestId('create-company-drawer'),
				).not.toBeInTheDocument()
			}, 500)
		})
	})
})
